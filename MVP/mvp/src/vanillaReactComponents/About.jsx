import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import DissPDF from '../assets/Dissertation_Final.pdf';

export default function About() {

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1,
        }
      });


    return(
        <div className='About-page-body'>
            <p>This project came about after getting to experience geometry nodes in 3D modelling software. 
                I wanted to see if the node based approach of creation could be applied to Graphics Design. Therefore for my bachelor's degree 
                final project I decided to build this web-application. The following document explains the research and development of this project. <br/>  </p>
            <iframe src={DissPDF} width="75%" height="100%" />
        </div>
    )
}