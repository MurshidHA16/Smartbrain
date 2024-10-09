import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import './App.css';
import Rank from './Components/Rank/Rank'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/Sign In/SignIn';
import Register from './Components/Register/Register';

//API Stuff

const returnClarifaiJSONrequestOptions =(imageURL) => {

  const PAT = 'c3d9df482a6b45c686ca3f5dfa1eec3c';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'murshid-01';       
  const APP_ID = 'facerecognition';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';    
  const IMAGE_URL = imageURL;
  

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageURL
                }
            }
        }
    ]
  });
  const requestOptions= {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;

};

const initialState= {
      input: '',
      imageURL: '',
      route: 'signin',
      box: {
        topRow: null,
        leftCol: null,
        bottomRow: null,
        rightCol: null
      },
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''

      }
}
class App extends React.Component{
  constructor(){
    super();
    this.state = initialState;

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
  }
  
  //componentDidMount() {
   // fetch('http://localhost:3001/')
    //  .then(response => response.json())
     // .then(console.log)
  //}

  onRouteChange = (route)=>{
    if (route==='signout'){
      this.setState(initialState)
    } else if (route === 'home') {
        this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  displayFaceBox = (box) => {
    this.setState({box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  };

  onDetectChange = () => {
    this.setState({ imageURL: this.state.input }, () => {
      fetch("http://localhost:5000/clarifai", returnClarifaiJSONrequestOptions(this.state.input))
        .then(response => response.json())
        .then(response => {
           console.log('Full response: ', response)

          const regions = response.outputs[0].data.regions;
          if (regions) {
            regions.forEach(region => {
              const boundingBox = region.region_info.bounding_box;
              const topRow = (boundingBox.top_row * 100).toFixed(2) + '%';
              const leftCol = (boundingBox.left_col * 100).toFixed(2) + '%';
              const bottomRow = ((1-boundingBox.bottom_row) * 100).toFixed(2) + '%';
              const rightCol = ((1-boundingBox.right_col) * 100).toFixed(2) + '%';

              console.log(`BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);

              this.displayFaceBox({
                topRow,
                leftCol,
                bottomRow,
                rightCol
              });
            });
          } else {
            console.log('No regions found in response');
          }
      })
        .catch(error => console.log('Error fetching from Clarifai API:', error));  
    });
  };


  render(){
      return (
        <div className="App">
            <ParticlesBg type="lines" num= {300} bg={true} />
            <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
            {this.state.route==='home'
                ? <div>
                    
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                    <ImageLinkForm onInputChange={this.onInputChange} onDetectChange={this.onDetectChange}/> 
                    <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} />
                  </div>
                : (
                  this.state.route ==='signin'
                  ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  )
              };   
        </div>
      );
  } 

}

export default App;
