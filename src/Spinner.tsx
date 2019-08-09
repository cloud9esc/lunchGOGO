import React from 'react';
import './Spinner.css';

class Spinner extends React.Component {
  state = {
    menuArray: [],
    showMenu: false,
    menu: null,
  }

  async componentDidMount() {
    await this.getMenuArray();
  }

  getMenuArray = async () => {
    const res = await fetch("http://192.168.1.24:8000/api/v1/lunch");
    const data = await res.json();
    const menuArray = await data.data.menues;
    this.setState({ menuArray });
  }

  pickLunch = () => {
    const { menuArray } = this.state;
    if (menuArray === []) {
      return "";
    }
    if (menuArray !== []) {
      const randomID: number = Math.round(Math.random() * (menuArray.length-1));
      const menu:any = menuArray[randomID];
      this.setState({menu: menu.name, showMenu: true});
    }
  }

  reset = () => {
    this.setState({showMenu: false});
  }

  render() {
    const {showMenu, menu, menuArray} = this.state;
    return (
      <div className="Spinner">
        <div className="Spinner__fixed">오늘의 메뉴는</div>
        {!showMenu && <button className="Spinner__button" onClick={this.pickLunch}>무엇일까요?</button>}
        {showMenu && <div className="Spinner__menu">{menu} !!</div>}
        {showMenu && <button className="Spinner__reset" onClick={this.reset}>~다시~</button>}
        <ul className="Spinner__menubox">{menuArray.map((item:any) => (
          <li key={item.id} className="Spinner__menulist">{item.name}</li>
        ))}</ul>
      </div>
    )
  }
}

export default Spinner;