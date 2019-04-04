package com.example.springbootjournal.controller

import com.example.springbootjournal.models.Journal
import com.example.springbootjournal.repository.JournalRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller // 스프링 MVC 엔진이 웹 컨트롤러로 취급할 수 있게 클래스 앞에 @Controller 를 붙임.
class JournalController {
    @Autowired // JournalRepository 타입의 Repo 변수를 자동 연결해서 index 메서드가 갖다 쓸 수 있게 해준다.
    val repo: JournalRepository? = null

    @RequestMapping("/") // "/" 경로 요청을 담당하는 핸들러로 임명한다.
    fun index(model: Model): String {
        model.addAttribute("journal", repo?.findAll())
        return "index" // index.html 을 찾아서 반환.
    }

    @RequestMapping(value = ["/journal"], produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    @ResponseBody
    fun getJournal(): List<Journal>? {
        return repo?.findAll()
    }
}