package com.example.springbootjournal.repository

import com.example.springbootjournal.models.Journal
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface JournalRepository : JpaRepository<Journal, Long>