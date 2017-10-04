import './index.scss'

export default class App extends Component {
  render () {
    return (
      <div className='app'>
        { React.Children.toArray(this.props.children) }
      </div>
    );
  }
}
