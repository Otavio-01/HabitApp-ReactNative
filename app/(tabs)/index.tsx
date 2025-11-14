import React from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Importando nosso cérebro e nossos blocos
import AddHabitForm from '../../components/AddHabitForm'; // Requisito: Componente [cite: 20]
import HabitCard from '../../components/HabitCard'; // Requisito: Componente [cite: 19]
import { useHabits } from '../../hooks/useHabits'; // Requisito: Hook customizado [cite: 14]

export default function HomeScreen() {
  // Pegando a lógica centralizada (agora com 'removeHabit')
  const { habits, addHabit, toggleHabitCompletion, removeHabit } = useHabits();

  // --- NOVIDADE AQUI ---
  // Função para confirmar a remoção (para não apagar sem querer)
  const handleRemoveHabit = (id: string, text: string) => {
    Alert.alert(
      "Remover Hábito",
      `Você tem certeza que deseja remover o hábito "${text}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Remover", 
          onPress: () => removeHabit(id), // Só remove se clicar aqui
          style: "destructive"
        }
      ]
    );
  };
  // --- FIM DA NOVIDADE ---

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Hábitos</Text>
      </View>

      {/* Formulário para cadastrar novos hábitos */}
      <AddHabitForm onAddHabit={addHabit} />

      {/* Lista de hábitos cadastrados */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onToggleCompletion={() => toggleHabitCompletion(item.id)}
            // --- NOVIDADE AQUI ---
            onRemove={() => handleRemoveHabit(item.id, item.text)} // Passa a função de remover
            // --- FIM DA NOVIDADE ---
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>Nenhum hábito cadastrado ainda.</Text>
          </View>
        }
        style={styles.list}
      />
    </SafeAreaView>
  );
}

// Requisito: Layout com StyleSheet [cite: 23]
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    flex: 1, 
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyContainerText: {
    fontSize: 16,
    color: '#888',
  },
});