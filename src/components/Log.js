import moment from 'moment';
import React from 'react';
import mui from 'material-ui';

const Colors = mui.Styles.Colors;
const { Checkbox, DatePicker } = mui;

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // Can go away with 1.0 release of plugin

class Log extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { logDateKey: this._getDateKey() };
  }

  _getDateKey(date = moment()) {
    return moment(date).format('YYYY-MM-DD');
  }

  _getGoalColor({ startColor, finishColor }) {
    const goalDone = this.props.logEntries[this.state.logDateKey] && this.props.logEntries[this.state.logDateKey].status;
    return goalDone ? finishColor : startColor || Colors.grey400;
  }

  _isGoalComplete(goal) {
    return !!this.props.logEntries.getIn([this.state.logDateKey, goal]);
  }

  _onDateChanged(nil, date) {
    this.setState({ logDateKey: this._getDateKey(date) });
  }

  _onGoalChecked(e, checked) {
    this.props.updateGoalStatus(this.state.logDateKey, e.target.value, checked);
  }

  render() {
    return (
      <div>
        <DatePicker
          autoOk
          hintText="Controlled Date Input"
          onChange={ this._onDateChanged.bind(this) }
          value={ moment(this.state.logDateKey).toDate() } />

        <Checkbox
          name="checkboxName1"
          value="workout"
          checked={ this._isGoalComplete('workout') }
          onCheck={ this._onGoalChecked.bind(this) }
          label="Work out for 45 minutes"/>

        <Checkbox
          name="checkboxName2"
          value="water"
          checked={ this._isGoalComplete('water') }
          onCheck={ this._onGoalChecked.bind(this) }
          label="Drink 100 oz. of water"/>

        <Checkbox
          name="checkboxName3"
          value="veggies"
          checked={ this._isGoalComplete('veggies') }
          onCheck={ this._onGoalChecked.bind(this) }
          label="Eat 3 servings of vegetables"/>
      </div>
    );
  }
}

Log.propTypes = {
  logEntries: React.PropTypes.object.isRequired,
  updateGoalStatus: React.PropTypes.func.isRequired
};

Log.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default Log;
