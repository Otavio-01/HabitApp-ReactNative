import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Habit } from '../hooks/useHabits'; // Importando a "forma" do hábito que criamos

// Definindo as propriedades do componente
type HabitCardProps = {
  habit: Habit;
  onToggleCompletion: () => void;
};

// Requisito: Componente HabitCard
export default function HabitCard({ habit, onToggleCompletion }: HabitCardProps) {
  return (
    <View style={styles.card}>
      <Text style={[styles.text, habit.completedToday && styles.textCompleted]}>
        {habit.text}
      </Text>
      
      {/* Botão para marcar como concluído */}
      <TouchableOpacity onPress={onToggleCompletion} style={styles.touchable}>
        <View style={[styles.checkbox, habit.completedToday && styles.checkboxCompleted]}>
          {habit.completedToday && <Text style={styles.checkMark}>✓</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Requisito: Layout com StyleSheet
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    fontSize: 18,
    flex: 1, 
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  touchable: {
    marginLeft: 15,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#007bff',
  },
  checkMark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});