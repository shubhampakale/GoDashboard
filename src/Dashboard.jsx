import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "./firebase";
import { get, set, ref, onValue } from "firebase/database";

export default function Dashboard() {
  const videos = [
    "Welcome to series on GO programming language",
    "Before you start with golang",
    "Golang installation and hello world",
    "GOPATH and reading go docs",
    "Lexer in golang and Types",
    "Variables, types and constants",
    "Comma ok syntax and packages in golang",
    "Conversions in golang",
    "Handling time in golang",
    "Build for windows, linux and mac",
    "Memory management in golang",
    "Pointers in golang",
    "Array in golang",
    "Slices in golang",
    "How to remove a value from slice based on index in golang",
    "Maps in golang",
    "Structs in golang",
    "If else in golang",
    "Switch case in golang and online playground",
    "Loop break continue and goto in golang",
    "Functions in golang",
    "Methods in golang",
    "Defer in golang",
    "Working with files in golang",
    "Handling web request in golang",
    "Handling URL in golang",
    "Creating server for golang frontend",
    "How to make GET request in golang",
    "How to make POST request with JSON data in golang",
    "How to send form data in golang",
    "How to create JSON data in golang",
    "How to consume JSON data in golang",
    "A long video on MOD in golang",
    "Building API in golang - Models",
    "Sending a API json response for all courses in golang",
    "Get one course based on request id in golang",
    "Add a course controller in golang",
    "Update a course controller in golang",
    "Delete a course controller in golang",
    "Handling routes and testing routes in golang",
    "MongoDB setup for API in golang",
    "Defining models for netflix in golang",
    "Making a connection to database in golang",
    "Insert data in mongodb in golang",
    "Update a record in mongodb in golang",
    "Delete one and delete many in mongodb in golang",
    "Get all collection in mongodb in golang",
    "Get all movies from DB in golang",
    "Mark movie as watched in golang",
    "Delete 1 and all movie in golang",
    "Creating routes and testing API in golang",
    "Concurrency and goroutines in golang",
    "Wait groups in golang",
    "Mutex in golang",
    "Race Condition in golang",
    "Channels and Deadlock in golang",
    "Math, crypto and random number in golang"
  ];

  const [completed, setCompleted] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Listen for real-time updates from Firebase
    const progressRef = ref(db, "go-progress");
    const unsubscribe = onValue(
      progressRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setCompleted(snapshot.val());
        } else {
          setCompleted([]);
        }
        setLoaded(true);
      },
      (error) => {
        console.error("Firebase real-time read error:", error);
        setLoaded(true);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Only save to Firebase after initial load
    if (loaded) {
      set(ref(db, "go-progress"), completed)
        .catch((error) => {
          console.error("Firebase write error:", error);
        });
    }
  }, [completed, loaded]);

  const toggleVideo = (index) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  const progress = Math.round((completed.length / videos.length) * 100);

  const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];

  return (
    <div style={{ fontFamily: "Comic Sans MS, sans-serif", padding: "20px", maxWidth: "900px", margin: "auto", background: "#000", borderRadius: "16px", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "20px", color: "#fff", textShadow: "2px 2px #ff6a88" }}
      >
        🎉 Go Programming Playlist Tracker 🌈
      </motion.h1>

      <div style={{ background: "rgba(30,30,30,0.95)", borderRadius: "12px", padding: "20px" }}>
        <h2 style={{ color: "#fff" }}>Progress: {progress}%</h2>
        <div style={{ background: "#444", borderRadius: "12px", overflow: "hidden", marginBottom: "30px", height: "25px" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #ff6a88, #ff99ac, #fc6076, #ff9a44)",
              borderRadius: "12px"
            }}
          />
        </div>

        <div>
          {videos.map((title, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "8px",
                background: completed.includes(index) ? "#1b4332" : colors[index % colors.length],
                cursor: "pointer",
                border: "2px solid #fff",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.5)"
              }}
              onClick={() => toggleVideo(index)}
            >
              <input
                type="checkbox"
                checked={completed.includes(index)}
                onChange={() => toggleVideo(index)}
                style={{ marginRight: "10px", transform: "scale(1.3)" }}
              />
              <span style={{ textDecoration: completed.includes(index) ? "line-through" : "none", fontWeight: "bold", color: completed.includes(index) ? "#ddd" : "#111" }}>
                {title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
