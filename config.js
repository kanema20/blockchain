var dbConfig = {    
    database: 'master',
    server: 'DESKTOP-HC9JDO2\\SQLEXPRESS',
    //port: '3005',
    driver: 'msnodesqlv8',
    //driver: {SQL Server Native Client 11.0},
    options: {
        trustedConnection: true
    }
    //connectionString:'Driver={SQL Server Native Client 11.0};Server={DESKTOP-HC9JDO2\\SQLExpress};Database={master};Trusted_Connection={True};'
};

module.export = dbConfig;