import { Component } from 'react';

class Alert extends Component {
   constructor(props) {
      super(props);
      this.color = null;
      this.bgColor = null;
   }

   getStyle = () => {
      return {
         color: this.color,
         backgroundColor: this.bgColor,
         borderWidth: "2px",
         borderStyle: "solid",
         fontWeight: "bolder",
         borderRadius: "7px",
         borderColor: this.color,
         textAlign: "center",
         fontSize: "12px",
         margin: "10px",
         padding: "10px",
      };
   }

   render() {
      return (
         <div className="Alert">
            <p style={this.getStyle()}>{this.props.text}</p>
         </div>
      );
   }
}

class InfoAlert extends Alert {
   constructor(props) {
      super(props);
      this.color = 'rgb(0, 0, 255)'; // blue
      this.bgColor = 'rgb(220, 220, 255)'; // light blue
   }
}

class ErrorAlert extends Alert {
   constructor(props) {
      super(props);
      this.color = 'rgb(255, 0, 0)'; // red
      this.bgColor = 'rgb(255, 220, 220)'; // light red
   }
}  

class WarningAlert extends Alert {
   constructor(props) {
      super(props);
      this.color = 'rgb(255, 255, 0)'; // yellow
      this.bgColor = 'rgb(255, 255, 220)'; // light yellow
   }
}

export { InfoAlert, ErrorAlert, WarningAlert };