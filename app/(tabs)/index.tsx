import React from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Importando nosso cérebro e nossos blocos
// O caminho (../) está correto para sair de (tabs) e depois de app
import AddHabitForm from '../../components/AddHabitForm'; // Requisito: Componente
import HabitCard from '../../components/HabitCard'; // Requisito: Componente
import { useHabits } from '../../hooks/useHabits'; // Requisito: Hook customizado

export default function HomeScreen() {
  // Pegando a lógica centralizada do nosso hook
  const { habits, addHabit, toggleHabitCompletion } = useHabits();

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
            onToggleCompletion={() => toggleHabitCompletion(item.id)} // Passa a função de marcar
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

// Requisito: Layout com StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    // Garante que não sobreponha a barra de status do Android
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
    flex: 1, // Ocupa o espaço restante
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