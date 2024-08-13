/** @format */

class TrieNode {
	constructor() {
		this.children = {};
		this.isEndOfWord = false;
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode();
	}

	// Insert a word into the Trie
	insert(word) {
		let node = this.root;
		for (let char of word) {
			if (!node.children[char]) {
				node.children[char] = new TrieNode();
			}
			node = node.children[char];
		}
		node.isEndOfWord = true;
	}

	// Find all words in the Trie that start with the given prefix
	search(prefix) {
		let node = this.root;
		for (let char of prefix) {
			if (!node.children[char]) {
				return [];
			}
			node = node.children[char];
		}
		return this._findAllWords(node, prefix);
	}

	// Helper function to find all words starting from a given node
	_findAllWords(node, prefix) {
		let results = [];
		if (node.isEndOfWord) {
			results.push(prefix);
		}
		for (let char in node.children) {
			results = results.concat(
				this._findAllWords(node.children[char], prefix + char)
			);
		}
		return results;
	}
}

// Example words to be inserted into the Trie
function getUniqueWords() {
	// Get all elements with class 'divi'
	const element = document.querySelector(".divi");

	// Create a Set to store unique words
	const uniqueWords = new Set();
	const words = element.textContent.split(",").map((word) => word.trim());

	// Add each word to the Set (duplicates will be ignored)
	words.forEach((word) => {
		if (word) {
			uniqueWords.add(word);
		}
	});

	return uniqueWords;
}
const words = getUniqueWords();
console.log(words);

// Initialize the Trie and insert words
const trie = new Trie();
words.forEach((word) => trie.insert(word));

function showSuggestions() {
	const input = document.getElementById("search-bar").value;
	const suggestionsContainer = document.getElementById("suggestions");
	suggestionsContainer.innerHTML = ""; // Clear previous suggestions

	if (input.length > 0) {
		const suggestions = trie.search(input);
		if (suggestions.length > 0) {
			suggestionsContainer.style.display = "block";
			suggestions.forEach((suggestion) => {
				const suggestionElement = document.createElement("div");
				suggestionElement.textContent = suggestion;
				suggestionElement.onclick = () => {
					document.getElementById("search-bar").value = suggestion;
					suggestionsContainer.style.display = "none";
				};
				suggestionsContainer.appendChild(suggestionElement);
			});
		} else {
			suggestionsContainer.style.display = "none";
		}
	} else {
		suggestionsContainer.style.display = "none";
	}
}
