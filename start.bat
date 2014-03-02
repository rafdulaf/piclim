@echo off
rem   Copyright 2010 Anyware Services
rem
rem   Licensed under the Apache License, Version 2.0 (the "License");
rem   you may not use this file except in compliance with the License.
rem   You may obtain a copy of the License at
rem
rem       http://www.apache.org/licenses/LICENSE-2.0
rem
rem   Unless required by applicable law or agreed to in writing, software
rem   distributed under the License is distributed on an "AS IS" BASIS,
rem   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
rem   See the License for the specific language governing permissions and
rem   limitations under the License.
rem

cd "D:\Personnel et Confidentiel\Other\Piclim\jetty"
"D:\Programs\Java\1.7.0_17x64\bin\java" -Xmx512M -XX:MaxPermSize=192M -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=7000 -jar start.jar