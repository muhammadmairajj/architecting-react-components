import React, { useState, useEffect } from "react";

const URL = "https://api.npoint.io/6fe80fd8273d7a0957e9";

function useFetch() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await fetch(URL)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setData(data?.data);
          });
      } catch (err) {
        // console.log(err);
        setIsError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
}


export default useFetch;