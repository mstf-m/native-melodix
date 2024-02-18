import { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import TextInput from "../components/forms/TextInput";
import SearchIcon from "../assets/SVGs/Search";
import axios from "axios";
import SongSearchCard from "../components/cards/SongSearchCard";
import Tag from "../components/Tag";

export default function SearchScreen() {
  const [selectedTag, setSelectedTag] = useState("title");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const tags = ["title", "lyrics"];

  const handleSearch = async () => {
    try {
      const url = `http://melodixapi.afarineshweb.ir/api/music/search?${selectedTag}=${query}&select=title,track,cover`;
      const response = await axios.get(url);

      //   console.log(response.data.data.music);
      setResults(response.data.data.music);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TextInput
          icon={<SearchIcon />}
          placeholder="Search songs, artists, albums..."
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          textContentType="none"
          returnKeyType="search"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              isSelected={selectedTag === tag}
              onSelect={setSelectedTag}
            />
          ))}
        </ScrollView>

        <FlatList
          horizontal={false}
          numColumns={3}
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <SongSearchCard
              key={`${index} search`}
              data={item}
              ListData={results}
              index={index}
              isSearchCard
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
