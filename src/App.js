import React from "react";
import logo from './logo.svg';
import './App.css';
import { render } from "react-dom";
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import HomePage from './Home.js';
import ListingPage from './Listing.js';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
}) 

function Table({ jsonData }) {
  return (
    <div>
      <h2>Table Generated from JSON</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Summary</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.summary}</td>
              <td>{item.bedrooms}</td>
              <td>{item.bathrooms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

