import React, { Component } from "react";
import {
  StatusBar,
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  Animated
} from "react-native";

const { width, height } = Dimensions.get("window");

const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
  const draggedRed = moveX < 87;
  const draggedBlue = moveX > 87 && moveX < 176;
  const draggedYellow = moveX > 176 && moveX < 255;
  const draggedGreen = moveX > 255 && moveX < 336;
  const draggedOrange = moveX > 336;
  let dragDirection = "";

  if (
    draggedRed ||
    draggedBlue ||
    draggedYellow ||
    draggedGreen ||
    draggedOrange
  ) {
    if (draggedRed) dragDirection += "red";
    if (draggedBlue) dragDirection += "blue";
    if (draggedYellow) dragDirection += "yellow";
    if (draggedGreen) dragDirection += "green";
    if (draggedOrange) dragDirection += "orange";
  }

  if (dragDirection) return dragDirection;
};

export default class App extends Component {
  state = {
    zone: "Still Touchable"
  };
  state = {
    pan: new Animated.ValueXY(),
    scaleAnim: new Animated.Value(1),
    animatedMargin: new Animated.Value(0),
    zoneid: this.props.id,
    zone: "null"
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        getDirectionAndColor(gestureState),
      onPanResponderGrant: (evt, gestureState) => {
        Animated.spring(this.state.scaleAnim, {
          toValue: 2
        }).start();
        Animated.spring(this.state.animatedMargin, {
          toValue: 16
        }).start();
      },
      // onPanResponderMove: (evt, gestureState) => {
      //   console.log(gestureState);
      //   if (evt.nativeEvent.locationX > 89.76143646240234) {
      //     this.setState({ idState: true });
      //   }
      // },

      onPanResponderMove: (evt, gestureState) => {
        const drag = getDirectionAndColor(gestureState);
        console.log(gestureState);
        this.setState({
          zone: drag
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        Animated.spring(this.state.scaleAnim, {
          toValue: 1
        }).start();
        Animated.spring(this.state.animatedMargin, {
          toValue: 0
        }).start();
      }
    });
  }

  render() {
    let animations1 =
      this.state.zone === "blue"
        ? {
          transform: [
            { scale: this.state.scaleAnim },
            { translateX: this.state.pan.x }
          ],
          paddingBottom: this.state.animatedMargin
        }
        : null;
    let animations =
      this.state.zone === "red"
        ? {
          transform: [{ scale: this.state.scaleAnim }],
          paddingBottom: this.state.animatedMargin
        }
        : null;
    let animations3 =
      this.state.zone === "yellow"
        ? {
          transform: [{ scale: this.state.scaleAnim }],
          paddingBottom: this.state.animatedMargin
        }
        : null;
    let animations4 =
      this.state.zone === "green"
        ? {
          transform: [{ scale: this.state.scaleAnim }],
          paddingBottom: this.state.animatedMargin
        }
        : null;
    let animations5 =
      this.state.zone === "orange"
        ? {
          transform: [{ scale: this.state.scaleAnim }],
          paddingBottom: this.state.animatedMargin
        }
        : null;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        <View style={styles.main} {...this._panResponder.panHandlers}>
          <Animated.View style={[styles.space, animations]}>
            <Image
              source={{
                uri:
                  "https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/App/Images/like.gif"
              }}
              style={{ width: 40, height: 40 }}
            />
          </Animated.View>
          <Animated.View style={[styles.space1, animations1]}>
            <Image
              source={{
                uri:
                  "https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/App/Images/love.gif"
              }}
              style={{ width: 40, height: 40 }}
            />
          </Animated.View>
          <Animated.View style={[styles.space2, animations3]}>
            <Image
              source={{
                uri:
                  "https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/App/Images/haha.gif"
              }}
              style={{ width: 40, height: 40 }}
            />
          </Animated.View>
          <Animated.View style={[styles.space3, animations4]}>
            <Image
              source={{
                uri:
                  "https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/App/Images/wow.gif"
              }}
              style={{ width: 40, height: 40 }}
            />
          </Animated.View>
          <Animated.View style={[styles.space4, , animations5]}>
            <Image
              source={{
                uri:
                  "https://raw.githubusercontent.com/duytq94/facebook-reaction-animation2/master/App/Images/sad.gif"
              }}
              style={{ width: 40, height: 40 }}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    flex: 1,

    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  space: {
    marginLeft: 20,
    marginRight: 10,
    width: 50,
    height: 50
  },
  space1: {
    marginLeft: 20,
    marginRight: 10,
    width: 50,
    height: 50
  },
  space2: {
    marginLeft: 20,
    marginRight: 10,
    width: 50,
    height: 50
  },
  space3: {
    marginLeft: 20,
    marginRight: 10,
    width: 50,
    height: 50
  },
  space4: {
    marginLeft: 20,
    marginRight: 10,
    width: 50,
    height: 50
  },
  main: {
    backgroundColor: "lightgrey",
    flex: 1,
    flexDirection: "row",
    width: 100,
    height: 50,
    borderRadius: 30,
    marginTop: 300
  }
});
