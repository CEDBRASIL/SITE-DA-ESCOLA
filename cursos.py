cursos = [
    {
        "nome": "Desenvolvimento de Apps Mobile",
        "categoria": "tecnologia",
        "descricao": "Crie aplicativos iOS e Android com ferramentas modernas.",
        "duracao": "12 meses",
    },
    {
        "nome": "Ciência de Dados para Iniciantes",
        "categoria": "tecnologia",
        "descricao": "Aprenda a extrair insights com Python e análise de dados.",
        "duracao": "10 meses",
    },
    {
        "nome": "Marketing de Mídias Sociais",
        "categoria": "administracao",
        "descricao": "Domine estratégias de engajamento nas redes mais usadas.",
        "duracao": "6 meses",
    },
    {
        "nome": "Fotografia Digital Profissional",
        "categoria": "design",
        "descricao": "Capture e edite imagens impressionantes como um especialista.",
        "duracao": "7 meses",
    },
    {
        "nome": "Espanhol do Zero à Fluência",
        "categoria": "idiomas",
        "descricao": "Conquiste a fluência para oportunidades internacionais.",
        "duracao": "8 meses",
    },
    {
        "nome": "Empreendedorismo na Prática",
        "categoria": "administracao",
        "descricao": "Transforme suas ideias em negócios rentáveis.",
        "duracao": "5 meses",
    },
]

if __name__ == "__main__":
    for c in cursos:
        print(f"{c['nome']} - {c['duracao']}")
