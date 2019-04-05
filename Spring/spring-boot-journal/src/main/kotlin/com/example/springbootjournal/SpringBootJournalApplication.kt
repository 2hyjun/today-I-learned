package com.example.springbootjournal

import com.example.springbootjournal.models.Journal
import com.example.springbootjournal.repository.JournalRepository
import org.springframework.beans.factory.InitializingBean
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class SpringBootJournalApplication {
    @Bean
    fun saveData(repo: JournalRepository) = InitializingBean {
        repo.save(Journal("스프링 부트 입문", "오늘부터 스프링 부트 공부하기 시작했다", "01/01/2016"))
        repo.save(Journal("스프링 부트 입문", "오늘부터 스프링 부트 공부하기 시작했다", "01/01/2016"))
        repo.save(Journal("스프링 부트 입문", "오늘부터 스프링 부트 공부하기 시작했다", "01/01/2016"))
        repo.save(Journal("스프링 부트 입문", "오늘부터 스프링 부트 공부하기 시작했다", "01/01/2016"))
        repo.save(Journal("스프링 부트 입문", "오늘부터 스프링 부트 공부하기 시작했다", "01/01/2016"))
        repo.save(Journal("스프링 부트 입문", "오늘부터 스프링 부트 공부하기 시작했다", "01/01/2016"))
    }
}

fun main(args: Array<String>) {
    runApplication<SpringBootJournalApplication>(*args)
}
