using LaundryManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LaundryManagerAPI.Data
{
    public class ApplicationDBContext:DbContext
    {
        public DbSet<Customer> tblCustomers { get; set; }
        public DbSet<Branch> tblBranch { get; set; }
        public DbSet<ProdCategory> tblProdCategory { get; set; }
        public DbSet<JobDetails> tblJobDetails { get; set; }
        public DbSet<Jobs> tblJobs { get; set; }
        public DbSet<JobStatus> tblJobStatus { get; set; }
        public DbSet<Membership> tblMembership { get; set; }
        public DbSet<MemberShipHistory> tblMemberShipHistory { get; set; }
        public DbSet<Product> tblProduct { get; set; }
        
        public DbSet<Users> tblUsers { get; set; }
        public DbSet<CustomerType> tblCustomerType { get; set; }
        public DbSet<Locality> tblLocality { get; set; }
        public DbSet<Recharge> tblRecharge { get; set; }
        public DbSet<Bill> tblBill { get; set; }
        public DbSet<PhycalRole> tblPhycalRole { get; set; }
        public DbSet<UserType> tblUserType{ get; set; }


        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>()
                .HasIndex(u => u.ProductName)
                .IsUnique();
            builder.Entity<ProdCategory>()
                .HasIndex(u => u.Description)
                .IsUnique();
            builder.Entity<UserType>()
               .HasIndex(u => u.RoleName)
               .IsUnique();
            builder.Entity<PhycalRole>()
               .HasIndex(u => u.PhyRole)
               .IsUnique();
            builder.Entity<CustomerType>()
               .HasIndex(u => u.CustomerTypeName)
               .IsUnique();
            builder.Entity<Locality>()
               .HasIndex(u => u.LocalArea)
               .IsUnique();
            builder.Entity<Membership>()
               .HasIndex(u => u.MembershipName)
               .IsUnique();
        }
    }
}
