import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Config from 'react-native-config';
export default class ResultScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.navigation.getParam('ign'),
			champion: null,
			data: [],
			API_KEY: Config.REACT_APP_LASTPLAYTIME_API_KEY,
			lastTimePlayed: '',
			champ: this.props.navigation.getParam('champ'),
			champName: null,
		};
	}
	static navigationOptions= ({navigation}) => ({
		title: 'Results',
	});
	displayError(){
		return <Text>{'An error occurred.'}</Text>
	}
	componentDidMount() {
    	this.getInfo(); // calls summoner api to retrieve summoner id, and use in callchampionMastery()
    	this.getChamp(this.state.champ);
	}

	getInfo = () => {
		const { name, API_KEY } = this.state;
		const url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${API_KEY}`;
		fetch(url)
			.then(infoRes => infoRes.json())
			.then(infoRes => {
				this.callchampionMastery(JSON.stringify(infoRes.id))
			});
	};
	getChamp = (champ) => {
		var upperChamp;
		switch (champ) {
			case "missfortune":
				upperChamp = "MissFortune";
				break;
			case "Missfortune":
				upperChamp = "MissFortune";
				break;
			case "mf":
				upperChamp = "MissFortune";
				break;
			case "j4":
				upperChamp = "JarvanIV";
				break;
			case "jarvan":
				upperChamp = "JarvanIV";
				break;
			case "Jarvan":
				upperChamp = "JarvanIV";
				break;
			case "aurelion sol":
				upperChamp = "AurelionSol";
				break;
			case "asol":
				upperChamp = "AurelionSol";
				break;
			case "Aurelionsol":
				upperChamp = "AurelionSol";
				break;
			case "Cho":
				upperChamp = "Chogath";
				break;
			case "mundo":
				upperChamp = "DrMundo";
				break;
			case "drmundo":
				upperChamp = "DrMundo";
				break;
			case "gp":
				upperChamp = "Gangplank";
				break;
			case "kog":
				upperChamp = "KogMaw";
				break;
			case "Kogmaw":
				upperChamp = "KogMaw";
				break;
			case "k6":
				upperChamp = "Khazix";
				break;
			case "kha":
				upperChamp = "Khazix";
				break;
			case "KhaZix":
				upperChamp = "Khazix";
				break;
			case "khazicks":
				upperChamp = "Khazix";
				break;
			case "yi":
				upperChamp = "MasterYi";
				break;
			case "Masteryi":
				upperChamp = "MasterYi";
				break;
			case "reksai":
				upperChamp = "RekSai";
				break;
			case "Reksai":
				upperChamp = "RekSai";
				break;
			case "tahm":
				upperChamp = "TahmKench";
				break;
			case "kench":
				upperChamp = "TahmKench";
				break;
			case "Tahmkench":
				upperChamp = "TahmKench";
				break;
			case "tf":
				upperChamp = "TwistedFate";
				break;
			case "TF":
				upperChamp = "TwistedFate";
				break;
			case "Tf":
				upperChamp = "TwistedFate";
				break;
			case "twistedfate":
				upperChamp = "TwistedFate";
				break;
			case "Twistedfate":
				upperChamp = "TwistedFate";
				break;
			case "xin":
				upperChamp = "XinZhao";
				break;
			case "xz":
				upperChamp = "XinZhao";
				break;
			case "Xin":
				upperChamp = "XinZhao";
				break;
			case "Xinzhao":
				upperChamp = "XinZhao";
				break;
			case "monkey":
				upperChamp = "MonkeyKing";
				break;
			case "wk":
				upperChamp = "MonkeyKing";
				break;
			case "wukong":
				upperChamp = "MonkeyKing";
				break;
			case "Wukong":
				upperChamp = "MonkeyKing";
				break;
			case "WuKong":
				upperChamp = "MonkeyKing";
				break;
			default:
				upperChamp = champ.charAt(0).toUpperCase() + champ.slice(1);
		}
		const champData = `http://ddragon.leagueoflegends.com/cdn/8.15.1/data/en_US/champion.json`;
		fetch(champData)
			.then(champRes => champRes.json())
			.then(champRes => {
				this.setState({champion: champRes.data[upperChamp].key});
			});
		this.setState({champName: upperChamp});
	};

	callchampionMastery = (summonerID) => {
		const { champion, API_KEY } = this.state;
		const champMastery = `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerID}/by-champion/${champion}?api_key=${API_KEY}`;
		fetch(champMastery)
			.then(champData => champData.json())
			.then(champData => {
				this.setState({ lastTimePlayed : JSON.stringify(champData.lastPlayTime)})
				this.setState({ data: champData});
			});
	};

	lastTimePlayedLocal(){
		var time = this.state.lastTimePlayed;
		if (time){
			var utcTime = moment.utc(parseInt(time)).format();
	  		return ((new Date(utcTime)).toString());
		}
	  	
	}
	render() {
		console.log(this.state.API_KEY);
	  	if (this.state.data.status){
	  		return(
	  			<ImageBackground source={require('../img/poro.png')} style={styles.container}>
	    		<View style={styles.container}>
	    		<Text style={styles.text}>{'Error: Sorry data cannot be loaded'}</Text>
	    		</View>
	    		</ImageBackground>
	    	)
	    }
    	else{
    		return(
    			<ImageBackground source={require('../img/marksman.png')} style={styles.bardContainer}>
	    		<View style={styles.container}>
			        <Text style={styles.item} >{'Champion Level: ' + this.state.data.championLevel}</Text>
			        {this.displayChestGranted()}
			        {this.displayNextLevelPoints()}
			        <Text style={styles.item}>{'Last time you played ' + this.state.champName +' was on ' + this.lastTimePlayedLocal()}</Text>
			    </View>
			    </ImageBackground>
		    );
    	}
    	 
	}
	displayNextLevelPoints(){
		if (JSON.stringify(this.state.data.championPointsUntilNextLevel)){
			return <Text style={styles.item} >{'You have reached maximum champion level for ' + this.state.champName + '.'}</Text>
		}
		else{
			return <Text style={styles.item} >{'Points until next level: ' + this.state.data.championPointsUntilNextLevel}</Text>
		}
	}
	displayChestGranted(){
		if (!JSON.stringify(this.state.data.chestGranted)){
			return <Text style={styles.item} >{'You have not been granted a chest this season.'}</Text>
		}
		else{
			return <Text style={styles.item} >{'Chest has already been granted this season!'}</Text>
		}
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		width: '104.5%',
		height: '100%',

	},
	bardContainer: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
	text:{
		fontSize: 15,
		paddingTop: 80,
	},
	item:{
		top: 80,
		color: 'black',
		fontSize: 20,
		paddingHorizontal: 10,
	},
});



AppRegistry.registerComponent('ResultScreen', () => ResultScreen);



