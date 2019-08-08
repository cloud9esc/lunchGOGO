import React from 'react';
import './NewMenu.css';

class NewMenu extends React.Component {
  state = {
    isInput: false,
    newMenu: "",
    delMenu: ""
  }

  toggle = () => {
    const { isInput } = this.state;
    if (isInput) {
      this.setState({ isInput: false })
    }
    if (!isInput) {
      this.setState({ isInput: true })
    }
  };

  handleChange = (ev: any) => {
    const name = ev.target.name;
    const value = ev.target.value;
    this.setState({
      [name]: value
    })
  };

  addMenu = async (ev: any) => {
    ev.preventDefault();
    if (this.state.newMenu === "") {
      this.setState({isInput:false})
    }
    const body = new FormData();
    body.append("menu", this.state.newMenu);
    const res = await fetch("http://192.168.1.24:8000/api/v1/lunch", {
      body,
      headers: {
        accept: "application/json",
      },
      method: "POST",
    });
    const {status, message} = await res.json();
    if(status === "failed") {
      alert(message);
    }
    if (status === "success") {
      alert("맛집이 하나 더!")
      window.location.reload();
    }
    this.setState({isInput: false});
  }

  deleteMenu = async (ev:any) => {
    ev.preventDefault();
    if (this.state.newMenu === "") {
      this.setState({isInput:false})
    }
    const body = new FormData();
    body.append("menu", this.state.delMenu);
    const res = await fetch("http://192.168.1.24:8000/api/v1/lunch", {
      body,
      headers: {
        accept: "application/json",
      },
      method: "DELETE",
    });
    const {status, message} = await res.json();
    if(status === "failed") {
      alert(message);
    }
    if (status === "success") {
      alert("굿바이 " + this.state.delMenu);
      window.location.reload();
    }
    this.setState({isInput: false})
  }
  render() {
    const { isInput, newMenu, delMenu } = this.state;
    return (
      <div className="NewMenu">
        {!isInput && <button className="NewMenu__button" onClick={this.toggle}>
          + 새로운 메뉴
        </button>}
        {isInput &&
          <form
            className="NewMenu__form"
            onSubmit={this.addMenu} >
            <input
              name="newMenu"
              value={newMenu}
              onChange={this.handleChange}
              className="NewMenu__input"
              type="text" />
            <button type="submit" value="Submit" className="NewMenu__submit" >+</button>
          </form>}
          <form
          className="NewMenu__deleteform"
          onSubmit={this.deleteMenu}>
            <input
             name="delMenu"
             value={delMenu}
             onChange={this.handleChange}
             className="NewMenu__input delete"
             type="text"/>
            <button type="submit" value="Submit" className="NewMenu__submit">-</button>
          </form>
      </div>
    )
  }
}

export default NewMenu;