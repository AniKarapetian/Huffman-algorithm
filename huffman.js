function frequency(line) {
	let data = [];
	let str = [];
	let count,
		k = 0;
	for (let i = 0; i < line.length; i++) {
		count = 0;
		if (str.indexOf(line[i]) == -1) {
			str.push(line[i]);
			for (let j = 0; j < line.length; j++) {
				if (line[i] == line[j]) {
					count++;
				}
			}
			data[k] = [];
			data[k][0] = line[i];
			data[k][1] = count;
			k++;
		}
	}
	return data;
}
function sortData(data) {
	let temp;
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data.length; j++) {
			if (data[i][1] < data[j][1]) {
				temp = data[i][1];
				data[i][1] = data[j][1];
				data[j][1] = temp;
				temp = data[i][0];
				data[i][0] = data[j][0];
				data[j][0] = temp;
			}
		}
	}
	return data;
}
function TreeNode(text, count) {
	this.text = text;
	this.count = count;
}
function sortNode(nodes) {
	let a;
	for (let i = 0; i < nodes.length; i++) {
		for (let j = 0; j < nodes.length; j++) {
			if (nodes[i].count < nodes[j].count) {
				a = nodes[i];
				nodes[i] = nodes[j];
				nodes[j] = a;
			}
		}
	}
	return nodes;
}

function stringToBinary(line) {
	let output = "";
	for (let i = 0; i < line.length; i++) {
		output += line[i].charCodeAt().toString(2) + " ";
	}
	return output;
}
function createNodes(data) {
	let nodes = [];
	for (let i = 0; i < data.length; i++) {
		nodes.push(new TreeNode(data[i][0], data[i][1]));
	}
	while (nodes.length !== 1) {
		let node = new TreeNode(
			nodes[0].text + nodes[1].text,
			nodes[0].count + nodes[1].count
		);
		node.left = nodes[0];
		node.right = nodes[1];
		nodes.push(node);
		nodes.splice(0, 2);
		sortNode(nodes);
	}
	return nodes;
}
function buildTable(node) {
	let table = {};
	function createTable(node, code) {
		code = code || "";
		if (node === undefined || node.text.length === 1) {
			table[node.text] = code;
		} else {
			createTable(node.left, code + "0");
			createTable(node.right, code + "1");
		}
		return table;
	}
	const result = createTable(node);
	const letters = Object.keys(result);

	if (letters.length === 1) {
		result[letters[0]] = "1";
	}
	return result;
}
function encodeToHuffman(line) {
	let data = frequency(line);
	data = sortData(data);
	let nodes = createNodes(data);
	let table = buildTable(nodes[0]);
	let newLine = "";
	for (let i = 0; i < line.length; i++) {
		newLine += table[line[i]] + " ";
	}
	return [newLine, table, nodes[0], data];
}
function reverseTable(table) {
	let newTable = {};
	for (let key in table) {
		newTable[table[key]] = key;
	}
	return newTable;
}
/*
function decodeFromHuffman(line, table) {
	let newLine = "";
	let codes = line.split(" ");
	for (let i = 0; i < codes.length - 1; i++) {
		newLine += table[codes[i]];
	}
	return newLine;
}*/

// let decodedLine = decodeFromHuffman(finalLine, table);
// console.log("After decoding from Huffman code:", decodedLine);

const encodeInput = document.getElementById("encode-input");
const submitBtn = document.getElementById("submit");
const canvas = document.getElementById("myCanvas");
const initialEncodeText = document.getElementById("initial-encode-text");
const binaryText = document.getElementById("binary-text");
const encodeResult = document.getElementById("encode-result");
const dataTable = document.getElementById("table");

function handleKeyDown(event) {
	if (event.key === "Enter") {
		showEncodeText();
	}
}
encodeInput.addEventListener("keydown", handleKeyDown);
submitBtn.onclick = showEncodeText;

// submitBtn.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	showEncodeText();
// });

// document.forms[0].addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	showEncodeText();
// });
//dataTable.innerHTML = "";

document
	.getElementById("reset")
	.addEventListener("click", () => window.location.reload());

function showEncodeText() {
	let encodeValue = encodeInput.value;
	// let encodeValue = "Hello World!";
	if (!encodeValue) {
		alert("Please input something...");
	} else {
		initialEncodeText.value = encodeValue;
		let data = encodeToHuffman(encodeValue);
		let finalLine = data[0];
		let table = data[1];
		let nodes = data[2];
		let frequency = data[3];
		let binaryString = stringToBinary(encodeValue);
		encodeInput.value = "";
		binaryText.value = binaryString;
		encodeResult.value = finalLine;
		window.codes = table;

		const len = frequency.length;
		let tableData = `<tr>
		<th>Symbol</th>
		<th>Frequency</th>
		<th>Binary Code</th>
		<th>Huffman Code</th>
		</tr>`;

		for (let i = 0; i < len; i++) {
			tableData += ` <tr>
			<td>${frequency[i][0]}</td>
			<td>${frequency[i][1]}</td>
			<td>${frequency[i][0].charCodeAt().toString(2)}</td>
			<td>${table[frequency[i][0]]}</td>
		  </tr>`;
		}
		dataTable.innerHTML = tableData;
	}
}
