import './App.css';
import React from 'react';
import styles from './homepage.module.scss';
import randomColor from 'randomcolor';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [color, setColor] = useState('blue');
  const [selectedLuminosity, setLuminosity] = useState('');
  const [selectedHue, setSelectedHue] = useState('');
  const [changeWidth, setChangeWidth] = useState(250);
  const [changeHeight, setChangeHeight] = useState(200);

  const [isXAnimationActive, setIsXAnimationActive] = useState(false);
  const [isYAnimationActive, setIsYAnimationActive] = useState(false);
  const [isInitialAnimationActive, setIsInitialAnimationActive] =
    useState(false);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsInitialAnimationActive(true);
      }, 6000);
    };
    const handleMouseMove = () => {
      resetTimer();
      setIsInitialAnimationActive(false);
    };
    const handleMouseLeave = () => {
      resetTimer();
      setIsInitialAnimationActive(false);
    };
    const handleMouseClick = () => {
      resetTimer();
      setIsInitialAnimationActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleMouseClick);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsXAnimationActive(true);
        setIsYAnimationActive(true);
      }, 10000);
    };
    const handleMouseMove = () => {
      resetTimer();
      setIsXAnimationActive(false);
      setIsYAnimationActive(false);
    };
    const handleMouseLeave = () => {
      resetTimer();
      setIsXAnimationActive(false);
      setIsYAnimationActive(false);
    };
    const handleMouseClick = () => {
      resetTimer();
      setIsXAnimationActive(false);
      setIsYAnimationActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleMouseClick);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <>
      <div className={styles.centering}>
        <div className={styles.centerElements}>
          <div
            className={`${
              isInitialAnimationActive ? styles.initialAnimation : ''
            }`}
          >
            <div className={`${isYAnimationActive ? styles.yAnimation : ''}`}>
              <div
                className={`${styles.randomColorBox} ${
                  isXAnimationActive ? styles.xAnimation : ''
                }`}
                style={{
                  backgroundColor: color,
                  transition: 'all 0.4s ease-out',
                  width: changeWidth,
                  height: changeHeight,
                }}
              >
                <div style={{ fontSize: 16 }}>Generated color: {color}</div>
              </div>
            </div>
          </div>
          <button
            className={styles.button}
            onClick={(event) => {
              setColor(
                randomColor({
                  luminosity: selectedLuminosity,
                  hue: selectedHue,
                }),
              );
            }}
          >
            Generate
          </button>
          <label>
            Select luminosity:&nbsp;&nbsp;
            <select
              name="selectLuminosity"
              style={{ width: 76, height: 22 }}
              value={selectedLuminosity}
              onChange={(event) => {
                setLuminosity(event.currentTarget.value);
              }}
            >
              <option value="">default</option>
              <option value="light">light</option>
              <option value="bright">bright</option>
              <option value="dark">dark</option>
            </select>
          </label>
          <label>
            Select hue:&nbsp; &nbsp;
            <select
              value={selectedHue}
              style={{ width: 76, height: 22 }}
              onChange={(event) => {
                setSelectedHue(event.currentTarget.value);
              }}
            >
              <option value="">default</option>
              <option value="red">red</option>
              <option value="orange">orange</option>
              <option value="yellow">yellow</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
              <option value="purple">purple</option>
              <option value="pink">pink</option>
              <option value="monochrome">monochrome</option>
            </select>
          </label>
          <label>
            Change color box width: &nbsp;
            <input
              //type="number"
              style={{ width: 60, height: 15 }}
              //value={changeWidth}
              onChange={(event) => {
                if (
                  event.currentTarget.value >= 100 &&
                  event.currentTarget.value <= 600
                ) {
                  setChangeWidth(Number(event.currentTarget.value));
                }
              }}
            ></input>
            px
          </label>
          <label>
            Change color box height: &nbsp;
            <input
              //type="number"
              style={{ width: 60, height: 15 }}
              //value={changeWidth}
              onChange={(event) => {
                if (
                  event.currentTarget.value >= 100 &&
                  event.currentTarget.value <= 400
                ) {
                  setChangeHeight(Number(event.currentTarget.value));
                }
              }}
            ></input>
            px
          </label>
        </div>
      </div>
    </>
  );
}
