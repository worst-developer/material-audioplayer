import loadAudios from './actions';

// import material-ui components
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';

// import icons
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Next from 'material-ui/svg-icons/av/skip-next';
import VolumeOff from 'material-ui/svg-icons/av/volume-off';

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import uuid from 'uuid/v4';

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 10,
  }
};

let tracks = []; // array of audio tracks for search field

const mapStateToProps = (state) => state.audio

@connect(mapStateToProps)
export default class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: 0,
      minutes: 0,
      seconds: 0,
      selectedRow: 0,
      pause: false,
      searchText: '',
      volume: 0.6,
    }
    this.props.dispatch(loadAudios());
  }

  componentDidMount() {
    let audio = this.refs.audio;
    // cannot find reason why I cannot bind event listener to function
    audio.addEventListener('progress', this.loadedProgress(audio.buffered))
    // audio.addEventListener('timeupdate', this.convertDuration(audio.currentTime));
    audio.addEventListener('timeupdate', () => console.log('pppppp')); // doesn't working
  }

  componentWillUnmount() {
    this.removeAllListeners();
  }

  propsToSeathArray = () => {
    this.props.songs.length !== 0 ? 
      tracks = this.props.songs.map(song => `${song.author} - ${song.title}`) : {};
  }

  handlePlay = () => {
    this.setState({
      pause: true
    }, () => this.refs.audio.play())
  }

  handlePause = () => {
    this.setState({
      pause: false
    }, () => this.refs.audio.pause())  
  }

  handleNextTrack = () => {
    this.setState({
      currentSong: this.state.currentSong + 1,
      selectedRow: this.state.selectedRow + 1
    }, () => this.handlePlay());
    if (this.state.currentSong === this.props.songs.length - 1) {
      this.setState({
        currentSong: 0,
        selectedRow: 0
      }, () => this.handlePlay());
    }
  }

  loadedProgress = (buffered) => {
    if (buffered.length) {
      var loaded = 100 * buffered.end(0) / audio.duration;
      return loaded.toFixed(0);
    }
  }

  convertDuration = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }


  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

  handleNewRequest = () => {
    this.setState({
      searchText: '',
    });
  };

  handleSelectRow = (selectedValue, index) => {
   this.setState({
     currentSong: index,
     selectedRow: index,
   }, () => this.handlePlay())
  }

  handleVolumeSlider = (event, value) => {
    this.refs.audio.volume = value;
    this.setState({ volume: value });
  };

  handleVolumeOff = () => {
    this.refs.audio.volume = 0;
    this.setState({ volume: 0 });
  };

  render() {
    this.propsToSeathArray();
    const audioTracks = 
      this.props.songs.map((song, index) => {
        return (
          <Table 
            onCellClick={ () => this.handleSelectRow(null, index) }
            key={ uuid() }>
            <TableBody 
              displayRowCheckbox={  false  }
              showRowHover={  true  }>
              <TableRow hovered={ this.state.selectedRow === index }>
                <TableRowColumn style={ {  width: '470px'  } }>{ song.author } - { song.title }</TableRowColumn>
                <TableRowColumn>{ this.convertDuration(song.audio_length) }</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        ) })
    const playButton = 
      <IconButton
      iconStyle={ styles.mediumIcon }
      style={ styles.medium }
      onClick={ this.handlePlay }
      >
        <Play />
      </IconButton> 
    
    return (
      <div>
        {  this.props.isFetching === true ?
        <div>
          <CircularProgress size={ 80 } thickness={ 5 } />
        </div> :
        <div className='main rollIn animated'>
          <Paper className='box-selectors box-selectors-center' zDepth={ 2 }>
            <div className='playerButtons'>
              <IconButton className='smallButton' onClick={ this.handleVolumeOff }>
                <VolumeOff />
              </IconButton> 
              {  this.state.pause === false ? playButton :
                <IconButton 
                  onClick={ this.handlePause }
                  iconStyle={ styles.mediumIcon }
                  style={ styles.medium }>
                  <Pause />
                </IconButton>
               }
              <IconButton className='smallButton' onClick={ this.handleNextTrack } >
                <Next/>
              </IconButton>
            </div>
            <div>
              <Slider
                min={ 0 }
                max={ 1 }
                step={ 0.1 }
                value={ this.state.volume }
                onChange={ this.handleVolumeSlider }
              />
              { audioTracks }
            </div>
            <div className='searchInput'>
              <AutoComplete
                animated={ true }
                fullWidth={ true }
                floatingLabelText='Search audiofile'
                filter={ AutoComplete.fuzzyFilter }
                dataSource={ tracks }
                open={ false }
                onNewRequest={ this.handleSelectRow }
                maxSearchResults={ 2 }
                style={ {  width: '400px'  } }
              />
            </div>
            <audio
              ref='audio'
              src={ this.props.songs[this.state.currentSong].audio_url }
            />
          </Paper>
        </div>
      }
      </div>
    );
  }
}
