import * as React from "react";
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { ipcRenderer } from "electron";
import indigo from 'material-ui/colors/indigo';

export interface StoredCopyListProps { list: string[]; }
export interface StoredCopyListStates { list: string[]; }

export class StoredCopyList extends React.Component<StoredCopyListProps, StoredCopyListStates> {
  constructor(props: any){
    super(props);
    this.state = {
      list: this.props.list
    }
    console.log(this.state.list)
  }

  componentDidMount(){
    ipcRenderer.on('handle-stack-change', (event: any, arg: any) => {
      this.setState({
        list: arg.stack
      })
    });
  }

  componentWillMount(){
    ipcRenderer.on('asynchronous-reply', (event: any, arg: any) => {
      this.setState({
        list: arg.stack
      })
    });

    ipcRenderer.send('asynchronous-message', 'update');
  }

  render() {
    return (
      <List>
        {
          this.state.list.map((value, index) => {
            return (<ListItem button>
              <Avatar style={{backgroundColor: indigo["500"]}}>⌘{index+1}</Avatar>
              <ListItemText primary={value}/>
            </ListItem>)
          })
        }
      </List>
    )
  }
}