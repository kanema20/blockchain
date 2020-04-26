var dbConfig = {    
    database: 'master',
    server: 'localhost\\SQLEXPRESS',
    //port: '3005',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
 //   connectionString:'Driver={SQL Server Native Client 11.0};Server={localhost\\SQLExpress};Database={studentdb};Trusted_Connection={True};'
};

module.export = dbConfig;