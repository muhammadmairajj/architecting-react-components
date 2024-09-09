import React, { useEffect, useRef, useState } from "react";

import Header from "./components/header";
import Suggestion from "./components/suggesstion";

import { getFilteredSuggestion } from "./utils";

import useFetch from "./hook/useFetch";

import "./style.css";
import Content from "./components/content";

/**~
 * This is my pattern/structure to import all of things
 * Third Parties import
 * after one line space All Components will be import
 * again one line space common utils will be import
 * again one line space redux and actions
 * again one line space constant files
 * again one line space CSS file import
 */

/**
 * Structure inside the component
 * props
 * useState
 * useEffect
 * hooks
 * functions
 * derived values
 *
 */

const MAX_WAIT_TIME = 5;

function AutoComplete() {
  const [language, setLanguage] = useState(""); // state
  const [userLanguages, setUserLanguages] = useState([]);
  const [timer, setTimer] = useState(MAX_WAIT_TIME);
  const [enabledTyping, setEnabledTyping] = useState(true);
  const [selectSuggestion, setSelectSuggestion] = useState(false);

  // useRef dom ko directly access krna or timerId store kr ka lya used kr thy hai
  const timerRef = useRef('');
  
  useEffect(() => {
  if(timer <=0) {
    clearInterval(timerRef.current);
    setEnabledTyping(true);
    setTimer(MAX_WAIT_TIME);
  }
  }, [timer]);

  const { data = [], isLoading = false, isError = false } = useFetch() || {}; // hooks

  // Function
  function handleLanguageChange(e) {
    const value = e?.target?.value;
    setLanguage(value);
  }

  function handleKeyPress(e) {
    const value = e?.target?.value;
    // console.log(e)
    if (e?.key === "Enter") {
      const oldLangs = [...userLanguages];
      oldLangs.push({ id: value, value: value });
      setUserLanguages(oldLangs);
    }
  }

  function handleSelectSuggesstion({ id, value }) {
    // console.log({id, value});
    const oldLangs = [...userLanguages];
    oldLangs.push({ id, value });
    setUserLanguages(oldLangs);
    setLanguage("");
    setEnabledTyping(false);
    timerRef.current = setInterval(() => {
      setTimer((prevVal) => prevVal - 1);
    }, 1000);
  }

  // Derived Value (here, data is transform);
  const filteredSuggestion = getFilteredSuggestion({ data, language });

  if (isLoading) return <h1>Loading ...</h1>;
  if (!data.length) return <h1>No Data</h1>;
  if (isError) return <h1>{isError.message}</h1>;

  return (
    <div className="autocomplete">
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        onKeyPress={handleKeyPress}
        timer={timer}
        enabledTyping={!enabledTyping}
      />
      {!!language && !!filteredSuggestion.length && (
        <Suggestion
          suggestions={filteredSuggestion}
          onSuggestionSelect={handleSelectSuggesstion}
        />
      )}
      <Content languages={userLanguages} />
    </div>
  );
}

export default AutoComplete;



/**
 * when we used useMemo, useCallback and memo?
 * 1. if your array contain 10000 elements
 * 2. execution time of a function is 2-4ms
 * 3. useCallback ka used hm us function ks sth kary gy jo clicked listener ka sth attach hai
 * ko kisi button sa attach hai or ya kisi listener sa attach hai
 * 4. useMemo ka used hm expensive calculation ki value ko cache krna ka lya kr tha hai
 * value ko cache krna ka lya jin ka calculation heavy hai
 * 5. memo aik HOC hai jo pura component ko optimize krna ka lya used ho tha hai
 * agr component ma obj reference type ka data ha raha hai tho memo phr work nhe kr tha. memo basically 
 * shallow comparison kr tha hai. mens memo km kry ga for String, Number, plain object and etc
 * not to worked for nested object data if component received to nested type of object data
 * memoize kr tha un component ko jo br br re-rendered kr tha hai 
 * memo ma agr references same hai objects ka then no problem and if reference are different then no worked
 * q ka memo ko laga ga ka hr br ka new objects or array hai 
 */