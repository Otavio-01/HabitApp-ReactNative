import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

// Chave para salvar os dados
const STORAGE_KEY = '@habit_app_data';

// Definindo a "forma" de um hábito (isso é o TypeScript)
export interface Habit {
  id: string;
  text: string;
  completedToday: boolean;
}

export function useHabits() {
  // Estado para armazenar a lista de hábitos
  const [habits, setHabits] = useState<Habit[]>([]); // Requisito: useState

  // Efeito para carregar os dados ao iniciar o app
  useEffect(() => { // Requisito: useEffect
    loadHabits();
  }, []);

  // Efeito para salvar os dados sempre que 'habits' mudar
  useEffect(() => { // Requisito: useEffect
    saveHabits(habits);
  }, [habits]);

  // --- LÓGICA DE DADOS ---
  // Requisito: Centralizar toda a lógica no hook

  const loadHabits = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem(STORAGE_KEY); // Requisito: carregar dados
      if (storedHabits !== null) {
        setHabits(JSON.parse(storedHabits));
      }
    } catch (e) {
      console.error("Erro ao carregar hábitos: ", e);
    }
  };

  const saveHabits = async (habitsToSave: Habit[]) => {
    try {
      const jsonValue = JSON.stringify(habitsToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue); // Requisito: salvar dados
    } catch (e) {
      console.error("Erro ao salvar hábitos: ", e);
    }
  };

  const addHabit = (text: string) => { // Requisito: adicionar hábitos
    if (!text || text.trim() === "") return; // Evita hábitos vazios

    const newHabit: Habit = {
      id: Date.now().toString(), // ID único
      text: text.trim(),
      completedToday: false, // Status de conclusão diário
    };

    setHabits(prevHabits => [...prevHabits, newHabit]);
  };

  const toggleHabitCompletion = (id: string) => { // Requisito: marcar como concluído
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id ? { ...habit, completedToday: !habit.completedToday } : habit
      )
    );
  };

  // --- NOVIDADE AQUI ---
  /**
   * Remove um hábito da lista baseado no ID
   */
  const removeHabit = (id: string) => { // Requisito: remover hábitos
    setHabits(prevHabits => 
      prevHabits.filter(habit => habit.id !== id)
    );
  };
  // --- FIM DA NOVIDADE ---


  // Retorna os dados e as funções que o app usará
  // Adicionamos 'removeHabit' ao retorno
  return { habits, addHabit, toggleHabitCompletion, removeHabit };
}