import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.scss';

export const Footer = () => {
    return (
        <footer className="mt-auto py-3">
          <div className="container">
            <p className="text-center my-footer-text">&copy; 2023 TamarFlix</p>
          </div>
        </footer>
      );
    }

