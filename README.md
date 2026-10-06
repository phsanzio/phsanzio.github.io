# Convite de 15 Anos - Enrolados

Site estático para GitHub Pages.

## Estrutura

```text
convite_enrolados/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
├── videos/
│   ├── lanternas.mp4
│   └── cena-2.mp4
└── images/
```

## 1. Coloque os vídeos

Copie:

- `Lanterns_floating_over_lake_1080p_20261005205853.mp4`
  para `videos/lanternas.mp4`

- `pc_hdcomia.mp4`
  para `videos/cena-2.mp4`

Os arquivos estão referenciados exatamente por esses nomes no HTML.

## 2. Configure o convite

Abra `index.html` e substitua:

- `[NOME DA DEBUTANTE]`
- `[DIA DA SEMANA]`
- `[00]`
- `[MÊS]`
- `[ANO]`
- `[20:00]`
- `[NOME DO ESPAÇO]`
- `[TRAJE]`
- `[Rua, número]`
- `[Bairro, Cidade - MG]`
- `[00000-000]`
- `[TAMANHO]`
- `[NÚMERO]`
- `SUA-CHAVE-PIX-AQUI`

## 3. Configure a data

Abra:

`js/main.js`

Procure:

```js
eventDate: "2027-02-21T20:00:00",
```

e troque pela data/hora real da festa.

Formato:

```text
AAAA-MM-DDTHH:MM:SS
```

Exemplo:

```js
eventDate: "2027-11-15T20:00:00",
```

## 4. Google Forms

Crie um formulário com:

1. Nome completo
2. Vou comparecer?
   - Sim, com certeza!
   - Infelizmente não poderei ir
3. WhatsApp
4. E-mail
5. Sou convidada (gênero feminino)?
6. Tamanho do chinelo
   - 33/34
   - 35/36
   - 37/38
   - 39/40
   - 41/42
7. Quantidade de acompanhantes
8. Nome dos acompanhantes
9. Recadinho para a debutante

Depois copie o link de resposta do Google Forms.

No `index.html`, procure:

```html
https://docs.google.com/forms/d/e/SEU_FORM_ID/viewform
```

e substitua pelo link real.

## 5. Google Sheets

No Google Forms:

Respostas -> Vincular ao Google Planilhas.

Assim todas as confirmações ficam em uma planilha.

## 6. Testar localmente

Não é obrigatório usar servidor. Você pode abrir o `index.html` diretamente.

Para testar de forma mais parecida com o GitHub Pages, use Python:

```bash
python3 -m http.server 5500
```

Depois:

```text
http://localhost:5500
```

## 7. Publicar no GitHub Pages

Crie um repositório, por exemplo:

```text
convite-15-anos
```

Coloque todos os arquivos dentro dele.

Depois:

1. GitHub -> Settings
2. Pages
3. Source: Deploy from a branch
4. Branch: main
5. Folder: / (root)
6. Save

O GitHub Pages vai gerar uma URL parecida com:

```text
https://SEU-USUARIO.github.io/convite-15-anos/
```

## Observação sobre os vídeos

O primeiro vídeo tem 1920x1080 e 10 segundos e fica em loop.

O segundo vídeo tem 3840x2160, 60 fps e aproximadamente 5 segundos. Ele é reproduzido uma vez durante a transição.

## Importante

Os vídeos são os arquivos mais pesados do projeto. O GitHub recomenda manter os arquivos de um repositório GitHub dentro de limites razoáveis. Cada arquivo individual deve ficar abaixo de 100 MB para ser aceito normalmente pelo Git. Os dois vídeos atuais estão abaixo desse limite.

Se o projeto crescer e os vídeos ficarem maiores, vale considerar hospedá-los em um storage/CDN separado e deixar apenas o HTML/CSS/JS no GitHub Pages.
