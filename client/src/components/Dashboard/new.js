import React from 'react';
import {
    FloatingMenu,
    MainButton,
    ChildButton,
  } from 'react-floating-button-menu';
  import MdAdd from '@material-ui/icons/add';
  import MdClose from '@material-ui/icons/clear';
  import MdFavorite from '@material-ui/icons/favorite'; 
function New() {
  const  state = {
        isOpen: false,
      }
  return (
    <FloatingMenu
    slideSpeed={500}
    direction="up"
    spacing={8}
    isOpen={this.state.isOpen}
  >
    <MainButton
      iconResting={<MdAdd style={{ fontSize: 20 }} nativeColor="white" />}
      iconActive={<MdClose style={{ fontSize: 20 }} nativeColor="white" />}
      backgroundColor="black"
      onClick={() => this.setState({ isOpen: !this.state.isOpen })}
      size={56}
    />
     <ChildButton
      icon={<MdFavorite style={{ fontSize: 20 }} nativeColor="black" />}
      backgroundColor="white"
      size={40}
      onClick={() => console.log('First button clicked')}
    />
    <ChildButton
      icon={<MdFavorite style={{ fontSize: 20 }} nativeColor="black" />}
      backgroundColor="white"
      size={40}
    />
    <ChildButton
      icon={<MdFavorite style={{ fontSize: 20 }} nativeColor="black" />}
      backgroundColor="white"
      size={40}
    />
  </FloatingMenu>
  );
}

export default New;

  
   
  
  