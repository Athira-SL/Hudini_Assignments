'use client';


import Nav from './components/nav';
import Banner from './components/banner';
import Footer from './components/footer';
import Feed from './components/feed';

<>
<link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet"></link>

</>

export default function Page() {

return(
  <>
  <Nav/>
  <Banner/>
  <Feed/>
  <Footer/>
  </>
);
}