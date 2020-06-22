import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResourceCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h3>
            Name:
            <span className="card-petname">{this.props.resource.name}</span>
          </h3>
          {/* This is a ternary operator! If the resource has a breed, we'll display it. If not, we'll print an empty string (and display nothing) */}
          {this.props.resource.breed ? (
            <p>Breed: {this.props.resource.breed}</p>
          ) : (
            ""
          )}

          <Link to={`/${this.props.resourceName}/${this.props.resource.id}`}>
            <button>Details</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ResourceCard;