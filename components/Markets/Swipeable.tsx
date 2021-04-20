import React, { PureComponent } from "react";
import {
  Animated,
  Easing,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
} from "react-native";

interface SwipeableState {
  pan: Animated.ValueXY;
  width: number;
  lastOffset: { x: number; y: number };
  rightActionActivated: boolean;
  rightButtonsActivated: boolean;
  rightButtonsOpen: boolean;
}
interface SwipeableProps {
  children: any;
  rightContent?: any;
  rightButtons?: any;

  onRightActionActivate?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onRightActionDeactivate?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onRightActionRelease?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onRightActionComplete?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  rightActionActivationDistance?: number;
  rightActionReleaseAnimationFn?: any;
  rightActionReleaseAnimationConfig?: any;

  onRightButtonsActivate?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onRightButtonsDeactivate?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onRightButtonsOpenRelease?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onRightButtonsOpenComplete?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onRightButtonsCloseRelease?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onRightButtonsCloseComplete?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  rightButtonWidth?: number;
  rightButtonsActivationDistance?: number;
  rightButtonsOpenReleaseAnimationFn?: any;
  rightButtonsOpenReleaseAnimationConfig?: any;
  rightButtonsCloseReleaseAnimationFn?: any;
  rightButtonsCloseReleaseAnimationConfig?: any;

  onSwipeStart?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onSwipeMove?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onSwipeRelease?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  onSwipeComplete?: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    c: any
  ) => void;
  swipeReleaseAnimationFn?: any;
  swipeReleaseAnimationConfig?: {
    toValue: { x: number; y: number };
    duration: number;
    easing: number;
    useNativeDriver: boolean;
  };

  onRef?: (e: any) => void;
  onPanAnimatedValueRef?: (a: Animated.ValueXY) => void;
  swipeStartMinDistance?: number;

  style?: any;
  rightContainerStyle?: any;
  rightButtonContainerStyle?: any;
  contentContainerStyle?: any;
}

function noop() {}

export default class Swipeable extends PureComponent<
  SwipeableProps,
  SwipeableState
> {
  static defaultProps = {
    rightContent: null,
    rightButtons: null,

    // right action lifecycle
    onRightActionActivate: noop,
    onRightActionDeactivate: noop,
    onRightActionRelease: noop,
    onRightActionComplete: noop,
    rightActionActivationDistance: 125,
    rightActionReleaseAnimationFn: null,
    rightActionReleaseAnimationConfig: null,

    onRightButtonsActivate: noop,
    onRightButtonsDeactivate: noop,
    onRightButtonsOpenRelease: noop,
    onRightButtonsOpenComplete: noop,
    onRightButtonsCloseRelease: noop,
    onRightButtonsCloseComplete: noop,
    rightButtonWidth: 75,
    rightButtonsActivationDistance: 75,
    rightButtonsOpenReleaseAnimationFn: null,
    rightButtonsOpenReleaseAnimationConfig: null,
    rightButtonsCloseReleaseAnimationFn: null,
    rightButtonsCloseReleaseAnimationConfig: null,

    onSwipeStart: noop,
    onSwipeMove: noop,
    onSwipeRelease: noop,
    onSwipeComplete: noop,
    swipeReleaseAnimationFn: Animated.timing,
    swipeReleaseAnimationConfig: {
      toValue: { x: 0, y: 0 },
      duration: 250,
      easing: Easing.elastic(0.5),
      useNativeDriver: false,
    },

    onRef: noop,
    onPanAnimatedValueRef: noop,
    swipeStartMinDistance: 15,
  };

  state = {
    pan: new Animated.ValueXY(),
    width: 0,
    lastOffset: { x: 0, y: 0 },
    rightActionActivated: false,
    rightButtonsActivated: false,
    rightButtonsOpen: false,
  };

  componentDidMount() {
    const { onPanAnimatedValueRef, onRef } = this.props;

    onRef!(this);
    onPanAnimatedValueRef!(this.state.pan);
  }

  componentWillUnmount() {
    this._unmounted = true;
  }
  recenter = (
    animationFn = this.props.swipeReleaseAnimationFn,
    animationConfig = this.props.swipeReleaseAnimationConfig,
    onDone: any
  ) => {
    const { pan } = this.state;

    this.setState({
      lastOffset: { x: 0, y: 0 },
      rightActionActivated: false,
      rightButtonsActivated: false,
      rightButtonsOpen: false,
    });

    pan.flattenOffset();

    animationFn(pan, animationConfig).start(onDone);
  };

  _unmounted = false;

  _handlePan = Animated.event(
    [
      null,
      {
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      },
    ],
    { useNativeDriver: false }
  );

  _handleMoveShouldSetPanResponder = (event: any, gestureState: any) =>
    Math.abs(gestureState.dx) > this.props.swipeStartMinDistance!;

  _handlePanResponderStart = (event: any, gestureState: any) => {
    const { lastOffset, pan } = this.state;

    pan.setOffset(lastOffset);
    this.props.onSwipeStart!(event, gestureState, this);
  };

  _handlePanResponderMove = (event: any, gestureState: any) => {
    const {
      rightActionActivationDistance,
      rightButtonsActivationDistance,
      onRightActionActivate,
      onRightActionDeactivate,
      onRightButtonsActivate,
      onRightButtonsDeactivate,
      onSwipeMove,
    } = this.props;
    const {
      lastOffset,
      rightActionActivated,
      rightButtonsActivated,
    } = this.state;
    const { dx, vx } = gestureState;
    const x = dx + lastOffset.x;
    const canSwipeLeft = this._canSwipeLeft();
    const hasRightButtons = this._hasRightButtons();
    const isSwipingRight = vx > 0;
    let nextRightActionActivated = rightActionActivated;
    let nextRightButtonsActivated = rightButtonsActivated;

    this._handlePan(event, gestureState);
    onSwipeMove!(event, gestureState, this);

    if (
      !rightActionActivated &&
      canSwipeLeft &&
      x <= -rightActionActivationDistance!
    ) {
      nextRightActionActivated = true;
      onRightActionActivate!(event, gestureState, this);
    }

    if (
      rightActionActivated &&
      canSwipeLeft &&
      x > -rightActionActivationDistance!
    ) {
      nextRightActionActivated = false;
      onRightActionDeactivate!(event, gestureState, this);
    }

    if (
      !rightButtonsActivated &&
      hasRightButtons &&
      !isSwipingRight &&
      x <= -rightButtonsActivationDistance!
    ) {
      nextRightButtonsActivated = true;
      onRightButtonsActivate!(event, gestureState, this);
    }

    if (rightButtonsActivated && hasRightButtons && isSwipingRight) {
      nextRightButtonsActivated = false;
      onRightButtonsDeactivate!(event, gestureState, this);
    }

    const needsUpdate =
      nextRightActionActivated !== rightActionActivated ||
      nextRightButtonsActivated !== rightButtonsActivated;

    if (needsUpdate) {
      this.setState({
        rightActionActivated: nextRightActionActivated,
        rightButtonsActivated: nextRightButtonsActivated,
      });
    }
  };

  _handlePanResponderEnd = (event: any, gestureState: any) => {
    const {
      onRightActionRelease,
      onRightActionDeactivate,
      onRightButtonsOpenRelease,
      onRightButtonsCloseRelease,
      onSwipeRelease,
    } = this.props;
    const {
      rightActionActivated,
      rightButtonsOpen,
      rightButtonsActivated,
      pan,
    } = this.state;
    const animationFn = this._getReleaseAnimationFn();
    const animationConfig = this._getReleaseAnimationConfig();

    onSwipeRelease!(event, gestureState, this);
    if (rightActionActivated) {
      onRightActionRelease!(event, gestureState, this);
    }
    if (rightButtonsActivated && !rightButtonsOpen) {
      onRightButtonsOpenRelease!(event, gestureState, this);
    }

    if (!rightButtonsActivated && rightButtonsOpen) {
      onRightButtonsCloseRelease!(event, gestureState, this);
    }

    this.setState({
      lastOffset: {
        x: animationConfig.toValue.x,
        y: animationConfig.toValue.y,
      },
      rightActionActivated: false,
      rightButtonsOpen: rightButtonsActivated,
    });

    pan.flattenOffset();

    animationFn(pan, animationConfig).start(() => {
      if (this._unmounted) {
        return;
      }

      const {
        onRightActionComplete,
        onRightButtonsOpenComplete,
        onRightButtonsCloseComplete,
        onSwipeComplete,
      } = this.props;

      onSwipeComplete!(event, gestureState, this);

      if (rightActionActivated) {
        onRightActionComplete!(event, gestureState, this);
        onRightActionDeactivate!(event, gestureState, this);
      }

      if (rightButtonsActivated && !rightButtonsOpen) {
        onRightButtonsOpenComplete!(event, gestureState, this);
      }

      if (!rightButtonsActivated && rightButtonsOpen) {
        onRightButtonsCloseComplete!(event, gestureState, this);
      }
    });
  };

  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onMoveShouldSetPanResponderCapture: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderStart,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd,
    onPanResponderTerminationRequest: this._handlePanResponderEnd,
  });

  _handleLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }: any) => this.setState({ width });

  _canSwipeLeft() {
    return this.props.rightContent || this._hasRightButtons();
  }

  _hasRightButtons() {
    const { rightButtons, rightContent } = this.props;
    return !rightContent && rightButtons && rightButtons.length;
  }

  _getReleaseAnimationFn() {
    const {
      rightActionReleaseAnimationFn,
      rightButtonsOpenReleaseAnimationFn,
      rightButtonsCloseReleaseAnimationFn,
      swipeReleaseAnimationFn,
    } = this.props;
    const {
      rightActionActivated,
      rightButtonsActivated,
      rightButtonsOpen,
    } = this.state;

    if (rightActionActivated && rightActionReleaseAnimationFn) {
      return rightActionReleaseAnimationFn;
    }

    if (rightButtonsActivated && rightButtonsOpenReleaseAnimationFn) {
      return rightButtonsOpenReleaseAnimationFn;
    }

    if (
      !rightButtonsActivated &&
      rightButtonsOpen &&
      rightButtonsCloseReleaseAnimationFn
    ) {
      return rightButtonsCloseReleaseAnimationFn;
    }

    return swipeReleaseAnimationFn;
  }

  _getReleaseAnimationConfig() {
    const {
      rightActionReleaseAnimationConfig,
      rightButtons,
      rightButtonsOpenReleaseAnimationConfig,
      rightButtonsCloseReleaseAnimationConfig,
      rightButtonWidth,
      swipeReleaseAnimationConfig,
    } = this.props;
    const {
      rightActionActivated,
      rightButtonsActivated,
      rightButtonsOpen,
    } = this.state;

    if (rightActionActivated && rightActionReleaseAnimationConfig) {
      return rightActionReleaseAnimationConfig;
    }

    if (rightButtonsActivated) {
      return {
        ...swipeReleaseAnimationConfig,
        toValue: {
          x: rightButtons.length * rightButtonWidth! * -1,
          y: 0,
        },
        ...rightButtonsOpenReleaseAnimationConfig,
      };
    }

    if (
      !rightButtonsActivated &&
      rightButtonsOpen &&
      rightButtonsCloseReleaseAnimationConfig
    ) {
      return rightButtonsCloseReleaseAnimationConfig;
    }

    return swipeReleaseAnimationConfig;
  }

  _renderButtons(buttons: any, isLeftButtons: any) {
    const { rightButtonContainerStyle } = this.props;
    const { pan, width } = this.state;
    const canSwipeLeft = this._canSwipeLeft();

    const count = buttons.length;
    const leftEnd = canSwipeLeft ? -width : 0;
    const rightEnd = 0;
    const inputRange = isLeftButtons ? [0, rightEnd] : [leftEnd, 0];

    return buttons.map((buttonContent: any, index: any) => {
      const outputMultiplier = -index / count;
      const outputRange = isLeftButtons
        ? [0, rightEnd * outputMultiplier]
        : [leftEnd * outputMultiplier, 0];
      const transform = [
        {
          translateX: pan.x.interpolate({
            inputRange,
            outputRange,
            extrapolate: "clamp",
          }),
        },
      ];
      const buttonStyle = [
        StyleSheet.absoluteFill,
        { width, transform },
        rightButtonContainerStyle,
      ];

      return (
        <Animated.View key={index} style={buttonStyle}>
          {buttonContent}
        </Animated.View>
      );
    });
  }

  render() {
    const {
      children,
      contentContainerStyle,
      rightButtons,
      rightContainerStyle,
      rightContent,
      style,
      ...props
    } = this.props;
    const { pan, width } = this.state;
    const canSwipeLeft = this._canSwipeLeft();
    const transform = [
      {
        translateX: pan.x.interpolate({
          inputRange: [canSwipeLeft ? -width : 0, 0],
          outputRange: [
            canSwipeLeft ? -width + StyleSheet.hairlineWidth : 0,
            0,
          ],
          extrapolate: "clamp",
        }),
      },
    ];

    return (
      <View
        onLayout={this._handleLayout}
        style={styles.container}
        {...this._panResponder.panHandlers}
        {...props}
      >
        <Animated.View
          style={[{ transform }, styles.content, contentContainerStyle]}
        >
          {children}
        </Animated.View>
        <Animated.View
          style={[
            { transform, marginRight: -width, width },
            rightContainerStyle,
          ]}
        >
          {rightContent || this._renderButtons(rightButtons, false)}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  content: {
    width: "100%",
  },
});
