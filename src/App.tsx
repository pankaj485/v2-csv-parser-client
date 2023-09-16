import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
	// const BASE_URL = "https://v2-csv-parser.onrender.com";
	const BASE_URL = "http://localhost:8000";
	const HEADER_ENDPOINT = BASE_URL + "/fileupload/getheaders";
	const DATA_ENDPOINT = BASE_URL + "/fileupload/getcsvdata";

	const [csvfile, setCsvFile] = useState("");
	const [requestedHeaders, setRequestedHeaders] = useState(
		"description, industry, level, size,line_code, value,"
	);
	const [headerData, setHeaderData] = useState({});
	const [csvData, setCsvData] = useState([]);

	const getHeaders = async () => {
		const formData = new FormData();
		formData.append("csvfile", csvfile);
		formData.append("headers", requestedHeaders);
		console.log("FORM DATA: ", formData);

		try {
			const { data } = await axios.post(HEADER_ENDPOINT, formData);
			const { headersInFile, validHeaders } = data;

			setHeaderData(Object.assign(headerData, { headersInFile, validHeaders }));

			console.log("PASSING HEADER DATA: ", headerData);
		} catch (err) {
			setHeaderData(Object.assign(headerData, { headersInFile: [], validHeaders: [] }));
			console.log("ERROR HEADER DATA: ", headerData);
		}
	};

	const getCsvData = async () => {
		const formData = new FormData();
		formData.append("csvfile", csvfile);
		formData.append("headers", requestedHeaders);
		console.log("FORM DATA: ", formData);

		try {
			const { data } = await axios.post(DATA_ENDPOINT, formData);
			setCsvData(data);
		} catch (err) {
			setCsvData([]);
		}
	};

	return (
		<div>
			<div>
				<h2>CSV PARSER</h2>
				<div>
					<form>
						<label htmlFor="csvfile">Upload File: </label>
						<input
							type="file"
							name="csvfile"
							id="csvfile"
							onChange={(e) => {
								setCsvFile(e.target.files[0]);
							}}
						/>
					</form>
				</div>
				<div>
					<button onClick={() => getHeaders()}>Get Headers</button>
					<button onClick={() => getCsvData()}>Get Data</button>
				</div>

				{Boolean(headerData.length) && (
					<div>
						<p>Headers List</p>
						<pre>
							<code>{JSON.stringify(headerData, null, 2)}</code>
						</pre>
					</div>
				)}

				{Boolean(csvData.length) && (
					<div>
						<p>CSV to JSON Data</p>
						<pre>
							<code>{JSON.stringify(csvData, null, 2)}</code>
						</pre>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
