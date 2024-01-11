import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Project from "./pages/Project";

function App() {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
