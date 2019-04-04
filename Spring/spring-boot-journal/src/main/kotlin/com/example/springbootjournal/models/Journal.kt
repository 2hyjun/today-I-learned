package com.example.springbootjournal.models

import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity // DB에 저장가능한 Entity. Data class 로 저장하면 hashCode, equals 에서 문제가 있음.
class Journal(private var title: String?, private var summary: String?, date: String?) {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private var id: Long? = null

    @Transient
    private val format: SimpleDateFormat = SimpleDateFormat("MM/dd/yyyy")

    private var created: Date? = null

    init {
        date?.let {
            this.created = format.parse(it)
        }

    }

    constructor() : this(null, null, null)

    fun getCreatedAsShort(): String {
        return format.format(created)
    }

    fun getId(): Long? {
        return id
    }

    fun getTitle(): String? {
        return title
    }

    fun getSummary(): String? {
        return summary
    }

    fun getCreated(): Date? {
        return created
    }

    fun setId(id: Long) {
        this.id = id
    }

    fun setTitle(title: String) {
        this.title = title
    }

    fun setCreated(created: Date) {
        this.created = created
    }

    fun setSummary(summary: String) {
        this.summary = summary
    }

    override fun toString(): String {
        val value = StringBuilder("JournalEntity(")
        value.append("id: ")
        value.append(id)
        value.append(",title: ")
        value.append(title)
        value.append(",summary: ")
        value.append(summary)
        value.append(",created: ")
        value.append(getCreatedAsShort())
        value.append(")")
        return value.toString()
    }

}