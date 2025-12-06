import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    return () => subscription.unsubscribe();
};

export const useAuth = () => {
    return useContext(AuthContext);
};
