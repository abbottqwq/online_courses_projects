import React, { Component } from "react";

class Generation extends Component {
	state = { generation: { generationId: 999, expiration: "2020-05-01" } };

	componentDidMount() {
		this.fetchGeneration();
	}

	fetchGeneration = () => {
		fetch("http://locolhost:3000/generation").then((res) => {
			console.log("res", res);
		});
	};

	render() {
		const { generation } = this.state;
		return (
			<div>
				<h3>Generation {generation.generationId}</h3>
				<h4>{new Date(generation.expiration).toString()}</h4>
			</div>
		);
	}
}

export default Generation;
