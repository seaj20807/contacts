import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import * as Contacts from "expo-contacts";
import { useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>
                {item.name}{" "}
                {item.phoneNumbers ? item.phoneNumbers[0].number : ""}
              </Text>
            </View>
          )}
        />
      </View>
      <Button title="Get Contacts" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 9,
    marginTop: 50,
    marginLeft: 10,
  },
});
