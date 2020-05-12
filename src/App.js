import React from "react";
import "./styles.css";
import axios from "axios";
import propTypes from "prop-types";

const testData = [
	{
		name: "Dan Abramov",
		avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
		company: "@facebook"
	},
	{
		name: "Sophie Alpert",
		avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
		company: "Humu"
	},
	{
		name: "Sebastian Markbåge",
		avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
		company: "Facebook"
	}
];

function ConditionalStyling(props) {
	return (
		<div style={{ color: Math.random() < 1 ? "red" : "green" }}>
			{" "}
			I come in green and red{" "}
		</div>
	);
}

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = { userName: "" };
		this.onFieldChange = this.onFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	static propTypes = { name: propTypes.string.isRequired };

	async handleSubmit(event) {
		event.preventDefault();
		try {
			const { data } = await axios.get(
				`https://api.github.com/users/${this.state.userName}`
			);
			this.props.addUser(data);
			this.setState({ userName: "" });
		} catch (error) {
			alert("Not a valid Username");
			this.setState({ userName: "" });
		}
	}
	onFieldChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					name="userName"
					placeholder="Github Username"
					value={this.state.userName}
					onChange={this.onFieldChange}
					required
				/>
				<input type="submit" value="Add Card" />
			</form>
		);
	}
}

const CardList = props => {
	return (
		<div>
			{props.profiles.map(profile => {
				return <Card key={profile.name} obj={profile} />;
				// <Card {...profile} />; it also does the job. Spreads the values into props.
				// <Card name={"name"} avatarURL={url} company={fb} /> is repr.
			})}

			{/* The above expression will return [<card/>, <card/> , <card/>] which will be rendered by React */}
		</div>
	);
};

class Card extends React.Component {
	render() {
		const profile = this.props.obj;
		return (
			<div className="github-profile" style={{ margin: "1rem" }}>
				<img src={profile.avatar_url} alt="empty" style={{ width: 75 }} />
				<div
					className="info"
					style={{ display: "inline-block", marginLeft: 10 }}
				>
					<div
						className="name"
						style={{ fontSize: "125%", paddingBottom: 30, fontWeight: "bold" }}
					>
						{" "}
						{profile.name}
					</div>
					<div className="company"> {profile.company}</div>
				</div>
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profiles: testData
		};
		this.addUser = this.addUser.bind(this);
	}
	addUser(data) {
		let userObj = {
			avatar_url: data.avatar_url,
			name: data.name,
			company: data.company
		};
		this.setState({
			profiles: this.state.profiles.concat([userObj])
		});
	}
	render() {
		return (
			<div>
				<div id="App" className="header">
					{" "}
					{this.props.title}{" "}
				</div>
				<Form addUser={this.addUser} />
				<CardList profiles={this.state.profiles} />
				<ConditionalStyling />
			</div>
		);
	}
}

export default App;
