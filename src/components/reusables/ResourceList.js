import React, { Component } from "react";
import ResourceCard from "./ResourceCard";

export default class ResourceList extends Component {
  render() {
    const collection = this.props.collection; //"animals", "locations", etc

    const singularCollection =
      collection.charAt(0).toUpperCase() +
      collection.slice(1, collection.length - 1); // "Animal", "Location", etc
  
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            this.props.history.push(`/${collection}/new`);
          }}
        >
          Add {singularCollection}
        </button>
        <section className="list">
          {this.props.resources.map(singleResource => (
            <ResourceCard
              key={singleResource.id}
              collection={collection}
              resource={singleResource}
              {...this.props}
            />
          ))}
        </section>
      </React.Fragment>
    );
  }
}