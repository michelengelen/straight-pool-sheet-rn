import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import { CustomInput } from "./common";
import * as actions from '../actions';

class GameSettings extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    const inputIds = ["One", "Two"];
    console.log(this.props);

    return (
      <View style={{ flex: 1 }}>
        {inputIds.map((id, index) => {
          return (
            <CustomInput
              key={index}
              id={"player" + id}
              label={"Input name for player " + (index + 1)}
              value={this.props.players["player" + id].name}
              style={{ flex: 1 }}
              onChangeText={name =>
                this.props.updatePlayer({
                  key: "player" + id,
                  name: name
                })
              }
              placeholder={"Player " + id}
              secureTextEntry={false}
            />
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    players: state.gameSettings.players
  };
};

export default connect(mapStateToProps, actions)(GameSettings);
