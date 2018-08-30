

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      name: 'blizl',
      API_KEY: 'RGAPI-854a63a0-ae95-4ec7-9e66-7530a7042747',
      error: null,
      champion: 1,
    };
  }

  componentDidMount() {
    this.callSummoner(); // calls summoner api to retrieve summoner id, and use in callchampionMastery()
    
  }

  callSummoner = () => {
    const { name, API_KEY } = this.state;
    const url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${API_KEY}`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.callchampionMastery(JSON.stringify(res.id))
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  callchampionMastery = (summonerID) => {
    const { champion, API_KEY } = this.state;
    const champMastery = `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerID}/by-champion/${champion}?api_key=${API_KEY}`;
    this.setState({ loading: true });
    fetch(champMastery)
      .then(champData => champData.json())
      .then(champData => {
        this.setState({ data : JSON.stringify(champData)})
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  render() {
  	if (this.state.error){
  		return(
    		<View style={styles.item}>
    		<Text>{'Sorry data cannot be loaded'}</Text>
    		</View>
    		)
    	}
    	else{
    		return(
    		<View style={styles.item}>
		        <Text>{this.state.data}</Text>
		    </View>
		    )
    	}

  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',

	},
	textStyle:{
		fontSize: 40,
		textAlign: 'center',
		margin: 20,
	},
	countContainer:{
		alignItems: 'center',
		padding: 10,
	},
	countText:{
		color: '#FF00FF',
		fontSize: 30,
	},
	item:{
		flex: 1,
		alignSelf: 'stretch',
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 1,
	},
});