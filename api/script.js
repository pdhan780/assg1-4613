const express = require('express');
const supa = require('@supabase/supabase-js');
const supaUrl = 'https://fmmahgijeyrysnvqjahf.supabase.co'; 
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbWFoZ2lqZXlyeXNudnFqYWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNzI1NjcsImV4cCI6MjAyMjg0ODU2N30.eg-o0DIgof6uXTUX_nxIuaKu7JIKqeLMzLBup5nGRZk'; 
 
const supabase = supa.createClient(supaUrl, supaAnonKey);


const handleAllSeasons = app => {
    // Define a route handler for GET requests to '/api/seasons'
    app.get('/api/seasons', async (req, res) => {
        try {
            // Fetch data from Supabase
            const { data, error } = await supabase.from('seasons').select(); 

            // If there's an error fetching data, handle it
            if (error) {
                throw error;
            }

            // Send the fetched data as the response
            res.json(data);
        } catch (error) {
            // If an error occurs, log it and send a 500 status code with an error message
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

const handleAllCircuits = app => {
    // Define a route handler for GET requests to '/api/seasons'
    app.get('/api/circuits', async (req, res) => {
        try {
            // Fetch data from Supabase
            const { data, error } = await supabase.from('circuits').select(); 

            // If there's an error fetching data, handle it
            if (error) {
                throw error;
            }

            // Send the fetched data as the response
            res.json(data);
        } catch (error) {
            // If an error occurs, log it and send a 500 status code with an error message
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

const handleCircuitRef = app =>{
app.get('/api/circuits/:ref', async (req, res) => {
    const {ref} = req.params;
    const { data, error } = await supabase.from('circuits').select().eq('circuitRef',ref)

    if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    } else {
        if (data.length === 0) {
            res.status(404).send({ message: 'No data found for the provided parameters' });
        } else {
            res.json(data);
        }
    }
 });
};


const handleCircuitYear = app =>{
    app.get('/api/circuits/season/:year', async (req, res) => {
        const {year} = req.params;
        const { data, error } = await supabase
        .from("races")
        .select(`circuits (*)`) //get all 
        .eq('year', year)
        .order("round", { ascending: true });
    
        if (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            if (data.length === 0) {
                res.status(404).send({ message: 'No data found for the provided parameters' });
            } else {
                res.json(data);
            }
        }
     });
    };


const handleAllConstructors= app => {
    // Define a route handler for GET requests to '/api/seasons'
    app.get('/api/constructors', async (req, res) => {
        try {
            // Fetch data from Supabase
            const { data, error } = await supabase.from('constructors').select(); 

            // If there's an error fetching data, handle it
            if (error) {
                throw error;
            }

            // Send the fetched data as the response
            res.json(data);
        } catch (error) {
            // If an error occurs, log it and send a 500 status code with an error message
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

const handleConstructorRef = app =>{
    app.get('/api/constructors/:ref', async (req, res) => {
        const {ref} = req.params;
        const { data, error } = await supabase.from('constructors').select().eq('constructorRef',ref)
    
        if (error) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else {
            if (data.length === 0) {
                res.status(404).send({ message: 'No data found for the provided parameters' });
            } else {
                res.json(data);
            }
        }
     });
    };


const handleAllDrivers= app => {
        // Define a route handler for GET requests to '/api/seasons'
        app.get('/api/drivers', async (req, res) => {
            try {
                // Fetch data from Supabase
                const { data, error } = await supabase.from('drivers').select(); 
    
                // If there's an error fetching data, handle it
                if (error) {
                    throw error;
                }
    
                // Send the fetched data as the response
                res.json(data);
            } catch (error) {
                // If an error occurs, log it and send a 500 status code with an error message
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    };





const handleDriverRef = app =>{
        app.get('/api/drivers/:ref', async (req, res) => {
            const {ref} = req.params;
            const { data, error } = await supabase.from('drivers').select().eq('driverRef',ref)
        
            if (error) {
                res.status(500).send({ error: 'Internal Server Error' });
            } else {
                if (data.length === 0) {
                    res.status(404).send({ message: 'No data found for the provided parameters' });
                } else {
                    res.json(data);
                }
            }
         });
 };


const handleDriverSurname = app =>{
            app.get('/api/drivers/search/:substring', async (req, res) => {
                const {substring} = req.params;
                newString = substring.toLowerCase() //clean it
                const { data, error } = await supabase
                    .from('drivers')
                    .select()
                    .ilike('surname', `${newString}%`) // ilike for case-insensitive comparison
            
                if (error) {
                    res.status(500).send({ error: 'Internal Server Error' });
                } else {
                    if (data.length === 0) {
                        res.status(404).send({ message: 'No data found for the provided parameters' });
                    } else {
                        res.json(data);
                    }
                }
             });
};



const handleDriverRaceID= app =>{
            app.get('/api/drivers/race/:raceId', async (req, res) => {
                    const {raceId} = req.params;
                    const { data, error } = await supabase
                    .from('results')
                    .select(`drivers(*)`) //get all 
                    .eq('raceId', raceId);
                    console.log(data)
                    console.log(error)
                
                    if (error) {
                        res.status(500).send({ error: 'Internal Server Error' });
                    } else {
                        if (data.length === 0) {
                            res.status(404).send({ message: 'No data found for the provided parameters' });
                        } else {
                            res.json(data);
                    }
                }
            });
};

const handleRaceID= app =>{
                    app.get('/api/races/:raceId', async (req, res) => {
                            const {raceId} = req.params;
                            const { data, error } = await supabase
                            .from('races')
                            .select(`*,circuits(name,location,country)`) //get all 
                            .eq('raceId', raceId);
                            console.log(data)
                            console.log(error)
                        
                            if (error) {
                                res.status(500).send({ error: 'Internal Server Error' });
                            } else {
                                if (data.length === 0) {
                                    res.status(404).send({ message: 'No data found for the provided parameters' });
                                } else {
                                    res.json(data);
                                }
                            }
            });
};

module.exports ={handleAllSeasons,handleAllCircuits, handleCircuitRef,handleCircuitYear,handleAllConstructors,handleConstructorRef,handleAllDrivers,handleDriverRef,handleDriverSurname,handleDriverRaceID,handleRaceID}













