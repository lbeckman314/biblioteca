/*
liam beckman
13 august 2018
Project Step 5: Final Working Project
*/

-- set storage engine
SET storage_engine=INNODB;

-- drop tables to update everything
DROP TABLE IF EXISTS program_language;
DROP TABLE IF EXISTS program_author;
DROP TABLE IF EXISTS program_os;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS language;
DROP TABLE IF EXISTS os;
DROP TABLE IF EXISTS src;
DROP TABLE IF EXISTS program;

-- "main" program table
CREATE TABLE program(
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    purpose varchar(255),
    url varchar(255),
    version varchar(255),
    license varchar(255),
    PRIMARY KEY(id)
);

-- language(s) the program was written in
CREATE TABLE language(
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    url varchar(255),
    PRIMARY KEY(id)
)ENGINE=InnoDB;

-- foreign key table between program and language
CREATE TABLE program_language(
    lid int(10) NOT NULL,
    pid int(10) NOT NULL,
    FOREIGN KEY(pid) REFERENCES program(id) ON DELETE CASCADE,
    FOREIGN KEY(lid) REFERENCES language(id) ON DELETE CASCADE,
    PRIMARY KEY(pid,lid)
)ENGINE=InnoDB;

-- the people or organizations that wrote the program
CREATE TABLE author(
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    url varchar(255),
    PRIMARY KEY(id)
)ENGINE=InnoDB;

-- foreign key table between program and authors
CREATE TABLE program_author(
    aid int(10) NOT NULL,
    pid int(10) NOT NULL,
    FOREIGN KEY(pid) REFERENCES program(id) ON DELETE CASCADE,
    FOREIGN KEY(aid) REFERENCES author(id) ON DELETE CASCADE,
    PRIMARY KEY(pid,aid)
)ENGINE=InnoDB;

CREATE TABLE src(
    id int(10) NOT NULL AUTO_INCREMENT,
    url varchar(255) NOT NULL,
    type varchar(255),
    pid int(10) NOT NULL,
    FOREIGN KEY(pid) REFERENCES program(id) ON DELETE CASCADE,
    PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE os(
    id int(10) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    url varchar(255),
    PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE program_os(
    oid int(10) NOT NULL,
    pid int(10) NOT NULL,
    FOREIGN KEY(pid) REFERENCES program(id) ON DELETE CASCADE,
    FOREIGN KEY(oid) REFERENCES os(id) ON DELETE CASCADE
)ENGINE=InnoDB;


-- populate table of languages
INSERT INTO language(name, url) values("Bash", "https://www.gnu.org/software/bash/");
INSERT INTO language(name, url) values("C", "https://en.wikipedia.org/wiki/C_(programming_language)");
INSERT INTO language(name, url) values("C#", "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)");
INSERT INTO language(name, url) values("C++", "https://en.wikipedia.org/wiki/C%2B%2B");
INSERT INTO language(name, url) values("Golang", "https://golang.org/");
INSERT INTO language(name, url) values("Haskell", "https://www.haskell.org/");
INSERT INTO language(name, url) values("Java", "https://www.java.com/en/");
INSERT INTO language(name, url) values("JavaScript", "https://en.wikipedia.org/wiki/JavaScript");
INSERT INTO language(name, url) values("Lua", "https://www.lua.org/");
INSERT INTO language(name, url) values("MariaDB", "https://mariadb.org/");
INSERT INTO language(name, url) values("NASM", "https://www.nasm.us/");
INSERT INTO language(name, url) values("OCaml", "https://ocaml.org/");
INSERT INTO language(name, url) values("PHP", "https://secure.php.net/");
INSERT INTO language(name, url) values("Perl", "https://www.perl.org/");
INSERT INTO language(name, url) values("Python", "https://www.python.org/");
INSERT INTO language(name, url) values("R", "https://www.r-project.org/");
INSERT INTO language(name, url) values("Ruby", "https://www.ruby-lang.org/en/");
INSERT INTO language(name, url) values("Rust", "https://www.rust-lang.org/en-US/");
INSERT INTO language(name, url) values("Scheme", "http://schemers.org/");

-- populate table of authors
INSERT INTO author(name, url) values("Liam Beckman","https://liambeckman.com/");

-- populate table of operating systems
INSERT INTO os(name, url) values ("Linux", "https://www.kernel.org/");
INSERT INTO os(name, url) values ("Windows", "https://www.microsoft.com/en-us/windows/");
INSERT INTO os(name, url) values ("macOS", "https://www.apple.com/macos/");
INSERT INTO os(name, url) values ("Haiku", "https://www.haiku-os.org/");
INSERT INTO os(name, url) values ("FreeBSD", "https://www.freebsd.org/");
INSERT INTO os(name, url) values ("OpenBSD", "https://www.openbsd.org/");


INSERT INTO program(name,purpose,url,version) values ("withfeathers","Add a little Emily Dickinson to your day.","https://withfeathers.liambeckman.com/","0.1.0");
INSERT INTO program(name,purpose,url,version) values ("devilish","The shell from hell!","https://liambeckman.com/code/devilish/","0.1.0");
INSERT INTO program(name,purpose,url,version) values ("matriz","Multiply, add, transpose, and average matrices like it's going out of style!","https://liambeckman.com/code/matrix/","0.1.0");
INSERT INTO program(name,purpose,url,version) values ("prime","Output the first million primes!","https://liambeckman.com/code/prime/","0.1.0");
INSERT INTO program(name,purpose,url,version) values ("palindrome","Determine whether your string is a palindrome!","https://liambeckman.com/code/palindrome/","0.1.0");
INSERT INTO program(name,purpose,url,version) values ("biblioteca","~ A library for all your code, great and small. ~","https://biblioteca.liambeckman.com/","0.1.0");
INSERT INTO program(name,purpose,url,version) values ("RemoveMyWaste","An application for household hazardous waste removal.","https://removemywaste.liambeckman.com/","0.1.0");
INSERT INTO program(name,purpose,url,version) values ("demo","A terminal emulator emulator that allows users to try out programs.","https://liambeckman.com/code/demo/","0.1.0");
INSERT INTO program(name,purpose,url,version) values ("demonic","Like demo, but more demonic!","https://liambeckman.com/code/demonic/","0.1.0");
INSERT INTO program(name,purpose,url,version) values("wyeast","A multithreaded adventure game!","https://liambeckman.com/code/wyeast/","0.1.0");
INSERT INTO program(name,purpose,url,version) values("zigzag","A homegrown TCP chat system built with love.","https://liambeckman.com/code/zigzag/","0.1.0");

-- populate table of sources
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);
INSERT INTO src(url, type, pid) values ("https://github.com/lbeckman314/", "git", 1);

-- set entity attributes for program 1

-- written in Bash and C
INSERT INTO program_language(lid,pid) values(15,1);

-- written by liam
INSERT INTO program_author(aid,pid) values(1,1);

-- written for Linux, Windows, and macOS
INSERT INTO program_os(oid,pid) values(1,1);
INSERT INTO program_os(oid,pid) values(2,1);
INSERT INTO program_os(oid,pid) values(3,1);


-- display program table
-- SELECT * FROM program ORDER BY name;

/*
+----+--------------+---------------------+-----------------------------+----------+---------+
| id | name         | purpose             | url                         | version  | license |
+----+--------------+---------------------+-----------------------------+----------+---------+
|  1 | Calculatron  | calculates pi       | https://www.calculatron.org | 0.0.1    | MIT     |
|  2 | Neato        | calculates infinity | https://neato.com           | 22.22.22 | BSD     |
|  3 | Cool Program | calculates 123      | https://coolprogram.com     | 3.3.3    | GPL     |
+----+--------------+---------------------+-----------------------------+----------+---------+
*/
