import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import {Fade} from 'components/common';
import Images from 'assets/images';
import SPS from 'common/variables';
import SplashScreen from 'react-native-splash-screen';
import {getAppState} from '../../reducers/CommonReducer';

/**
 * rendering a LoadingIndicator depending on the size given in props
 */
class LoadingIndicator extends PureComponent {
  /**
   * React lifecycle hook - componentDidMount
   */
  componentDidMount() {
    SplashScreen.hide();
  }

  /**
   * React-Native render function
   * @return {*}
   */
  render() {
    const {appState, size} = this.props;
    const {containerStyle, fadeStyle} = styles;
    const {loader} = Images;

    switch (size) {
      case 'full-size':
        return (
          <Fade visible={appState.loading} style={fadeStyle}>
            <View style={containerStyle}>
              <Image source={loader} style={{width: 80, height: 20}} />
            </View>
          </Fade>
        );
      case 'medium':
        return <Image source={loader} style={{width: 60, height: 15}} />;
      default:
        return <Image source={loader} style={{width: 20, height: 5}} />;
    }
  }
}

LoadingIndicator.propTypes = {
  size: PropTypes.string,
  target: PropTypes.string,
  visible: PropTypes.bool,
  appState: PropTypes.object,
};

const {colors} = SPS.variables;
const styles = {
  fadeStyle: {
    backgroundColor: colors.grey.darkest,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = (state) => {
  return {
    ...getAppState(state),
  };
};

const connectedLoadingIndicator = connect(mapStateToProps, null)(LoadingIndicator);
export {connectedLoadingIndicator as LoadingIndicator};
