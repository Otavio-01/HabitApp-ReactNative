import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

// Definindo as "propriedades" que este componente espera receber
type AddHabitFormProps = {
  onAddHabit: (text: string) => void;
};

// Requisito: Componente AddHabitForm
export default function AddHabitForm({ onAddHabit }: AddHabitFormProps) {
  const [text, setText] = useState(''); // Requisito: useState

  const handlePress = () => {
    onAddHabit(text); // Chama a função do hook
    setText(''); // Limpa o campo
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Novo hábito (ex: Ler um livro)"
        value={text}
        onChangeText={setText}
      />
      <Button title="Adicionar" onPress={handlePress} />
    </View>
  );
}

// Requisito: Layout com StyleSheet
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});