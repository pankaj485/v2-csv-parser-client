import "./App.css";

function App() {
	return (
		<div>
			<div>
				<h1>CSV PARSER</h1>
				<div>
					<form>
						<label htmlFor="csvfile">Upload File: </label>
						<input id="csvfile" name="csvfile" type="file" />
					</form>
				</div>
				<div>
					<button>Get Headers</button>
					<button>Get Data</button>
				</div>
			</div>
		</div>
	);
}

export default App;
