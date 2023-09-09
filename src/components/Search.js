import { useState } from "react";
import Metaphor from "metaphor-node";
import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import '../Search.css';

export default function Search({ onSearchResults }) {
  const [locationInput, setLocationInput] = useState("");
  const [activityInput, setActivityInput] = useState("");

  const [locationInputSize, setLocationInputSize] = useState(8);
  const [activityInputSize, setActivityInputSize] = useState(8);

  const locationInputStyle = {
		display: "inline-block",
		width: `${locationInputSize}ch`,
  };

  const activityInputStyle = {
		display: "inline-block",
		width: `${activityInputSize}ch`,
  };

  function handleLocationChange(e) {
    setLocationInput(e.target.value); 
    if (e.target.value.length > 8){
      const additionalCh = Math.ceil((e.target.value.length - 8) / 2);
      setLocationInputSize(8+additionalCh);
    }else{
      setLocationInputSize(8);
    }
  }
  function handleActivityChange(e) {
    setActivityInput(e.target.value);
    if (e.target.value.length > 8) {
      const additionalCh = Math.ceil((e.target.value.length - 8) / 2);
      setActivityInputSize(8+additionalCh);
    }else{
      setActivityInputSize(8);
    }
  }
  const formSubmit = async () => {
    const metaphor = new Metaphor(process.env.REACT_APP_YOUR_API_KEY);

    try {
      const queryString = `Here are some ${activityInput} events or locations in ${locationInput} `;
      const response = await metaphor.search(queryString, {
        numResults: 10,
        useAutoprompt: true,
      });
      onSearchResults(response.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="HeroForm">
				<h1>
					I want to go to{" "}
					<span>
						<input
							id="location-input"
							className="HeroInput"
							variant="standard"
							placeholder="location..."
							style={locationInputStyle}
							value={locationInput}
							onChange={(e) => handleLocationChange(e)}
						/>
					</span>
					to do{" "}
					<span>
						<input
							id="activity-input"
							className="HeroInput"
							variant="standard"
							placeholder="activity..."
							style={activityInputStyle}
							value={activityInput}
							onChange={(e) => handleActivityChange(e)}
						/>
					</span>
				</h1>
			</div>

			<Button
				variant="contained"
				color="success"
				onClick={formSubmit}
				style={{
					fontFamily: "Inter",
          fontSize:"1rem"
				}}
			>
				Search
			</Button>
		</motion.div>
  );
}