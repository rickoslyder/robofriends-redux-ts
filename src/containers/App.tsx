import * as React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

export interface IRobot {
  name: string;
  id: number;
  email: string;
  username?: string
}

interface IAppProps {
}

export interface IAppState {
  robots: Array<IRobot>;
  searchfield: string;
}

class App extends React.Component<IAppProps, IAppState> {
  state: IAppState
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users => {this.setState({ robots: users})});
  }

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchfield: event.currentTarget.value })
  }

  render(): JSX.Element {
    const { robots, searchfield }: IAppState = this.state;
    const filteredRobots: IRobot[] = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default App;